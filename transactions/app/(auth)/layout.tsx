import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          href="/"
          className="relative z-20 flex items-center text-lg font-medium"
        >
          Floweden
        </Link>
      </div>
      <div className="lg:p-8">{children}</div>
    </div>
  )
}
