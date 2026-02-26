import Link from "next/link"

export function AgreeLinks() {
  return (
    <p className="text-muted-foreground px-8 text-center text-sm">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms"
        className="hover:text-primary underline underline-offset-4"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="hover:text-primary underline underline-offset-4"
      >
        Privacy Policy
      </Link>
      .
    </p>
  )
}
