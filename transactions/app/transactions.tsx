"use client"

import { QUERY } from "@/floweden/flow"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useQuery } from "@apollo/client/react"
import { format } from "date-fns"
import { DollarSign, LoaderIcon, TrendingDown, TrendingUp } from "lucide-react"
import { DeleteTransaction } from "./transaction-delete"
import { NewTransaction } from "./transaction-new"

export function Transactions() {
  const { data: initData, loading: gettingInit } = useQuery(
    QUERY["GET_ALL_INITIAL"] as any,
    {
      variables: {
        input: {
          filter: { school: { eq: "colonnetta" }, grade: { eq: "3b" } },
        },
      },
    },
  )
  const initials = (initData as any)?.getAllInitial?.items

  const { data, loading } = useQuery(QUERY["GET_ALL_TRANSACTION"] as any)
  const transactions = (data as any)?.getAllTransaction?.items

  const { currentUser } = useCurrentUser()
  const currentBalance: number =
    172 +
    transactions?.reduce((sum: number, t: { kind: string; amount: any }) => {
      return (
        sum +
        (t.kind === "income"
          ? parseFloat(String(t.amount))
          : -parseFloat(String(t.amount)))
      )
    }, 0)

  const totalIncome: number = transactions
    ?.filter((t: { kind: string }) => t.kind === "income")
    .reduce((sum: any, t: { amount: any }) => sum + t.amount, 0)

  const totalExpenses: number = transactions
    ?.filter((t: { kind: string }) => t.kind === "expense")
    .reduce((sum: any, t: { amount: any }) => sum + t.amount, 0)

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-linear-to-br from-green-50 to-green-100 p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-green-700">Current Balance</span>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-800">
            {currentBalance ? <>€{currentBalance.toFixed(2)}</> : null}
          </div>
          <div className="mt-1 text-sm text-green-600">Started with ${172}</div>
        </div>

        <div className="rounded-xl bg-linear-to-br from-blue-50 to-blue-100 p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-blue-700">Total Income</span>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-800">
            {totalIncome ? <>€{totalIncome?.toFixed(2)}</> : null}
          </div>
        </div>

        <div className="rounded-xl bg-linear-to-br from-red-50 to-red-100 p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-red-700">Total Expenses</span>
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-800">
            {totalExpenses ? <>€{totalExpenses?.toFixed(2)}</> : null}
          </div>
        </div>
      </div>
      <div className="">
        {loading ? (
          <div className="flex h-24 w-full items-center justify-center">
            <LoaderIcon className="h-4 w-4 animate-spin" />
          </div>
        ) : transactions?.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p>No transactions yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="rounded-tl-lg px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Details
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="rounded-tr-lg px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction: any) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {format(new Date(transaction.date), "PPP")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {transaction.desc}
                  </td>
                  <td
                    className={`px-4 py-3 text-right text-sm font-semibold ${
                      transaction.kind === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.kind === "income" ? "+" : "-"}€
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.kind === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.kind}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DeleteTransaction id={transaction.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {currentUser ? <NewTransaction /> : null}
    </div>
  )
}
