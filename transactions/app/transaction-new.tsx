"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MUTATION, QUERY } from "@/floweden/flow"
import { cn } from "@/lib/utils"
import { useMutation } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  date: z.date(),
  desc: z.string().min(2),
  kind: z.enum(["income", "expense"]),
  amount: z.number(),
})

export function NewTransaction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      desc: "",
      kind: "expense",
      amount: 10,
    },
  })

  const [createTransaction, { loading }] = useMutation(
    MUTATION["CREATE_TRANSACTION"] as any,
    { refetchQueries: [{ query: QUERY["GET_ALL_TRANSACTION"] as any }] },
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const input = { ...values, date: values.date.toISOString() }
    await createTransaction({ variables: { input } })
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-8 max-w-sm space-y-4 rounded-xl border px-4 py-4 shadow-2xl"
      >
        <h3 className="text-xl">Add new Transaction</h3>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of transaction</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      disabled={loading}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Lorem ipsum"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Kind of transaction</FormLabel>
              <FormControl>
                <NativeSelect {...field} disabled={loading}>
                  <NativeSelectOption value="expense">
                    Expense
                  </NativeSelectOption>
                  <NativeSelectOption value="income">Income</NativeSelectOption>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="10"
                  type="number"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          Add
        </Button>
      </form>
    </Form>
  )
}
