import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { MUTATION, QUERY } from "@/floweden/flow"
import { useMutation } from "@apollo/client/react"
import { loggedInResponse } from "@floweden/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
})

export function LoginForm({ magicLink = true }: { magicLink: boolean }) {
  const [emailSent, setEmailSent] = useState(null)
  const [genericError, setGenericError] = useState<string | null>(null)
  const [forgotPassword, { loading }] = useMutation(MUTATION.FORGOT_PASSWORD)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => form.setFocus("email"), [form])

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const { data }: { data: any } = await forgotPassword({
        variables: { email: values.email, magicLink },
      })
      if (data?.forgotPassword?.ok) {
        setEmailSent(data.forgotPassword.message)
      }
    } catch (error) {
      const msg =
        (error as Error).message || (error as any)?.graphQLErrors[0]?.message
      setGenericError(msg)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      {emailSent ? (
        <p className="text-sm font-medium">{emailSent}</p>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@example.com"
                    type="email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {genericError ? <FormMessage>{genericError}</FormMessage> : null}
          <Button type="submit" disabled={loading} className="w-full">
            Submit
          </Button>
        </form>
      )}
    </Form>
  )
}

const legacyLoginFormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z.string().min(6),
})

export function LegacyLoginForm() {
  const { replace } = useRouter()
  const [genericError, setGenericError] = useState<string | null>(null)
  const [login, { loading }] = useMutation(MUTATION.LOGIN, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QUERY.CURRENT_USER }],
    update(cache, { data: { login } }: any) {
      const { token, refreshToken, user } = login
      if (token && refreshToken) {
        loggedInResponse(cache, { accessToken: token, refreshToken, user })
      }
    },
  })
  const form = useForm<z.infer<typeof legacyLoginFormSchema>>({
    resolver: zodResolver(legacyLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => form.setFocus("email"), [form])

  async function onSubmit(values: z.infer<typeof legacyLoginFormSchema>) {
    try {
      await login({ variables: { ...values } })
      replace("/")
    } catch (error) {
      const msg =
        (error as Error).message || (error as any)?.graphQLErrors[0]?.message
      setGenericError(msg)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@example.com"
                  type="email"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  type="password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {genericError ? <FormMessage>{genericError}</FormMessage> : null}
        <Button type="submit" disabled={loading} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
