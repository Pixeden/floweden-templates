import { Field } from "@floweden/client"

const transactionKinds = [
  { value: "income", label: "income" },
  { value: "expense", label: "expense" },
] as const
export const transactionEnums = {
  TransactionKind: transactionKinds.map(({ value }) => value),
}
export type TransactionKinds = (typeof transactionKinds)[number]["value"]

export const transactionFields: Field[] = [
  {
    key: "date",
    type: "String",
    kind: "input",
    label: ` Date`,
    props: {
      type: "date",
      placeholder: ` Date`,
    },
    required: true,
  },
  {
    key: "desc",
    type: "String",
    kind: "input",
    label: ` Description`,
    props: {
      placeholder: ` Description`,
    },
    required: true,
  },
  {
    key: "school",
    type: "String",
    kind: "input",
    label: ` School`,
    props: {
      placeholder: ` School`,
    },
    required: true,
  },
  {
    key: "grade",
    type: "String",
    kind: "input",
    label: ` Grade`,
    props: {
      placeholder: ` Grade`,
    },
    required: true,
  },
  {
    key: "kind",
    required: true,
    type: "TransactionKind",
    kind: "select",
    label: ` Transaction Kind`,
    props: {
      placeholder: ` Transaction Kind`,
      options: transactionKinds,
    },
  },
  {
    key: "amount",
    required: true,
    type: "Float",
    kind: "input",
    label: ` Amount`,
    props: {
      placeholder: ` Amount`,
      type: "number",
    },
  },
]

export const initialFields: Field[] = [
  {
    key: "school",
    type: "String",
    kind: "input",
    label: ` School`,
    props: {
      placeholder: ` School`,
    },
    required: true,
  },
  {
    key: "grade",
    type: "String",
    kind: "input",
    label: ` Grade`,
    props: {
      placeholder: ` Grade`,
    },
    required: true,
  },
  {
    key: "amount",
    required: true,
    type: "Float",
    kind: "input",
    label: ` Amount`,
    props: {
      placeholder: ` Amount`,
      type: "number",
    },
  },
]
