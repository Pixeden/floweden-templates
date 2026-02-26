"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z
  .object({
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The new passwords did not match",
        path: ["passwordConfirmation"],
      })
    }
  })

export function ForgotPasswordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const token = searchParams.get("resetpassword")

  const [resetPassword] = useMutation(MUTATION.RESET_PASSWORD, {
    onError: () => {
      toast.error("Token invalidated to login with Magic Link", {
        onAutoClose: () => router.replace(pathname),
      })
    },
    refetchQueries: [{ query: QUERY.CURRENT_USER }],
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  })

  async function onSubmit({
    password,
    passwordConfirmation,
  }: z.infer<typeof FormSchema>) {
    try {
      const { data }: { data: any } = await resetPassword({
        variables: {
          token: token as string,
          password,
          passwordConfirmation,
        },
      })
      const message = data?.resetPassword?.message
      if (message) {
        toast.success(message, {
          onAutoClose: () => router.replace(pathname),
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="New password" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
