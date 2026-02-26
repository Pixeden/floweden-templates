import { Kind } from "@floweden/client"
import {
  initialFields,
  transactionEnums,
  transactionFields,
} from "./transaction"
import { userEnums, userFields } from "./user"

export const kinds: Kind[] = [
  {
    key: "user",
    label: "User",
    type: "User",
    collection: "users",
    fields: userFields,
    fieldIdentifier: "name",
    enums: userEnums,
    auth: {
      create: false,
      update: true,
      delete: "[ADMIN]",
    },
    deleteIf: ["roles", "ADMIN"],
  },
  {
    key: "transaction",
    label: "Transaction",
    type: "Transaction",
    collection: "transactions",
    fields: transactionFields,
    fieldIdentifier: "desc",
    enums: transactionEnums,
    auth: {
      create: "[ADMIN]",
      update: "[ADMIN]",
      delete: "[ADMIN]",
      get: false,
    },
  },
  {
    key: "initial",
    label: "Initial",
    type: "Initial",
    collection: "initials",
    fields: initialFields,
    auth: {
      create: true,
      update: "[ADMIN]",
      delete: "[ADMIN]",
      get: false,
    },
  },
]
