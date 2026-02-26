"use client"

import { ForgotPasswordDialog } from "@/app/(auth)/login/forgot-password"
import { MUTATION, QUERY } from "@/floweden/flow"
import { useMutation } from "@apollo/client/react"
import { loggedInResponse } from "@floweden/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function CheckMagicLink() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const [checkMagicLink] = useMutation(MUTATION.CHECK_MAGIC_LINK, {
    onError: () => {
      toast.error("Token invalidated to login with Magic Link", {
        onAutoClose: () => router.replace(pathname),
      })
    },
    update(cache, { data: { checkMagicLink } }: any) {
      const { token, refreshToken, user } = checkMagicLink
      if (token && refreshToken) {
        loggedInResponse(cache, { accessToken: token, refreshToken, user })
        router.replace(pathname)
        const isAdmin =
          user?.roles?.includes("ADMIN") || user?.roles?.includes("SUPERADMIN")
        toast.success(`Logged in as ${user.email}`, {
          duration: 10000,
          action: {
            label: isAdmin ? "Admin" : "Panel",
            onClick: () => {
              const redirectTo = isAdmin ? "/admin" : "/panel"
              router.push(redirectTo)
            },
          },
        })
      }
    },
    refetchQueries: [{ query: QUERY.CURRENT_USER }],
  })

  useEffect(() => {
    const mlink = searchParams.get("mlink")
    const resetpassword = searchParams.get("resetpassword")
    if (mlink) {
      checkMagicLink({ variables: { token: mlink } })
    }
    if (resetpassword) {
      setShowForgotPassword(true)
    }
  }, [searchParams, checkMagicLink])

  return (
    <ForgotPasswordDialog
      isOpen={showForgotPassword}
      setIsOpen={setShowForgotPassword}
    />
  )
}
