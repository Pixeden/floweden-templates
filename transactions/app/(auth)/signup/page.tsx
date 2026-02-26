import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AgreeLinks } from "../agree-links"
import { SignupForm } from "./signup-form"

export default function SignupPage() {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Signup</h1>
          <p className="text-muted-foreground text-sm">
            Create an account to access your Panel
          </p>
        </div>
        <SignupForm />
        <AgreeLinks />
      </div>
    </>
  )
}
