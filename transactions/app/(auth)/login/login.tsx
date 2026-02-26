import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { AgreeLinks } from "../agree-links"
import { LegacyLoginForm, LoginForm } from "./login-form"

export function Login() {
  return (
    <>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Sign Up
      </Link>
      <LoginForms />
    </>
  )
}

export interface LoginProps {
  redirect?: string
}

export function LoginForms({}: LoginProps) {
  const [formKind, setFormKind] = useState<"mlink" | "legacy" | "forgot">(
    "mlink",
  )

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {formKind === "mlink"
            ? "Login with Email"
            : formKind === "legacy"
              ? "Login with Password"
              : "Forgot Password"}
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email {formKind === "legacy" ? "and password" : ""} below
          to{" "}
          {formKind === "forgot" ? "reset your password" : "access your Panel"}
        </p>
      </div>
      <div className="grid gap-6">
        {formKind === "mlink" ? (
          <LoginForm magicLink />
        ) : formKind === "legacy" ? (
          <LegacyLoginForm />
        ) : (
          <LoginForm magicLink={false} />
        )}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">Or</span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            setFormKind((k) => {
              return k === "mlink"
                ? "legacy"
                : k === "legacy"
                  ? "forgot"
                  : "mlink"
            })
          }
        >
          {formKind === "mlink"
            ? "Login with email and password"
            : formKind === "legacy"
              ? "Forgot password?"
              : "Login with email"}
        </Button>
      </div>
      <AgreeLinks />
    </div>
  )
}
