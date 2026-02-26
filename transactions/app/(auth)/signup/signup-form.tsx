"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MUTATION, QUERY } from "@/floweden/flow"
import { useMutation } from "@apollo/client/react"
import { loggedInResponse } from "@floweden/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const signupFormSchema = z
  .object({
    email: z.string().email({
      message: "Must be a valid email",
    }),
    name: z.string(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["passwordConfirmation"],
      })
    }
  })

export function SignupForm() {
  const { replace } = useRouter()
  const [genericError, setGenericError] = useState<string | null>(null)
  const [signup, { loading }] = useMutation(MUTATION.SIGNUP, {
    refetchQueries: [{ query: QUERY.CURRENT_USER }],
    update(cache, { data: { signup } }: any) {
      const { token, refreshToken, user } = signup
      if (token && refreshToken) {
        loggedInResponse(cache, { accessToken: token, refreshToken, user })
        replace("/")
      }
      if (user && !token) {
        toast.error(
          `Email ${user.email} is already registered, try logging in.`,
        )
      }
    },
  })
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    try {
      const { email, name, password, passwordConfirmation } = values
      await signup({
        variables: {
          input: {
            email,
            name,
            password,
            passwordConfirmation,
          },
        },
      })
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" disabled={loading} {...field} />
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
                <Input
                  type="password"
                  placeholder="••••••••"
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
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
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
          Create Account
        </Button>
      </form>
    </Form>
  )
}
