import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import * as React from "react"

interface LayoutProps {
  preview?: string
  heading?: string
  baseUrl?: string
  logoPath?: string
  children: React.ReactNode
}

export const EmailLayout: React.FC<Readonly<LayoutProps>> = ({
  preview = "",
  heading = "",
  baseUrl = process.env.NEXT_PUBLIC_HOST,
  logoPath = "/img/logo.png",
  children,
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[16px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Link href={baseUrl}>
              <Img
                src={`${baseUrl}${logoPath}`}
                alt="Lu Photos"
                className="mx-auto my-0 h-16 w-16 object-contain"
              />
            </Link>
            <Heading className="mx-0 my-[12px] p-0 text-center text-[24px] font-normal text-black">
              {heading}
            </Heading>
            {children}
            <Hr className="mx-0 my-4 w-full border border-solid border-[#eaeaea]" />
            <Link
              href={baseUrl}
              className="text-center text-[14px] text-slate-600 no-underline"
            >
              Floweden
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
