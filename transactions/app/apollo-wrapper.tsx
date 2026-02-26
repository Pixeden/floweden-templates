"use client"

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs"
import { makeClient } from "@floweden/client"

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
