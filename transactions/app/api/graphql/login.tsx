import { Button, Section, Text } from "@react-email/components"

import * as React from "react"
import { EmailLayout } from "./email-layout"

export interface EmailProps {
  link?: string
  kind?: string
}

export const LoginEmail: React.FC<Readonly<EmailProps>> = ({
  link = process.env.NEXT_PUBLIC_HOST,
  kind,
}) => {
  return (
    <EmailLayout preview="Login to Floweden" heading="Login to Floweden">
      <Section className="mt-[32px] text-center">
        <Button
          className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={link}
        >
          Login
        </Button>
        <Text className="text-[10px] text-neutral-600">Login {kind}</Text>
      </Section>
    </EmailLayout>
  )
}
