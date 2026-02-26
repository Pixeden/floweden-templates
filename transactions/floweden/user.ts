import { Field } from "@floweden/client"

const roles = [
  { value: "USER", label: "USER" },
  { value: "AUTHOR", label: "AUTHOR" },
  { value: "ADMIN", label: "ADMIN" },
] as const
export const userEnums = { Roles: roles.map(({ value }) => value) }
export type Roles = (typeof roles)[number]["value"]

export const userFields: Field[] = [
  {
    key: "name",
    type: "String",
    kind: "input",
    label: ` Full Name`,
    props: {
      placeholder: ` Full Name`,
    },
    required: true,
  },
  {
    key: "email",
    type: "String",
    kind: "input",
    label: ` Email`,
    props: {
      placeholder: ` Email`,
    },
    required: true,
  },
  {
    key: "roles",
    required: true,
    type: "[Role]",
    kind: "checkbox",
    label: ` Roles`,
    props: {
      placeholder: ` Roles`,
      options: roles,
      isMulti: true,
    },
    private: true,
  },
]
