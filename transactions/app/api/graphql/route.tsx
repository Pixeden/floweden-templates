import { kinds } from "@/floweden/config"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { context, initServer, SendEmailProps } from "@floweden/server"
import { CreateEmailOptions, Resend } from "resend"
import { LoginEmail } from "./login"

const resend = new Resend(process.env.RESEND_API_KEY)

async function send({
  urlSuffix,
  kind,
  ...params
}: SendEmailProps & CreateEmailOptions) {
  return resend.emails.send({
    ...params,
    from: "Floweden <contact@mailing.lu-photos.com>",
    subject: `Login to Floweden`,
    text: "Login to Floweden",
    react: (
      <LoginEmail
        kind={kind}
        link={`${process.env.NEXT_PUBLIC_HOST}${urlSuffix}`}
      />
    ),
  })
}

const server = initServer({ emailing: { send }, config: kinds })

const handler = startServerAndCreateNextHandler(server, { context })

export async function GET(request: Request) {
  return handler(request)
}

export async function POST(request: Request) {
  return handler(request)
}
