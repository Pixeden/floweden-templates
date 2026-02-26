import { Transactions } from "./transactions"
import { UserMenu } from "./user-menu"

export default function Home() {
  return (
    <div className="min-h-screen p-20">
      <UserMenu className="absolute top-4 right-4" />

      <main className="">
        <Transactions />
      </main>
    </div>
  )
}
