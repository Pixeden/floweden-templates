import { createRedisAdapter } from "@floweden/redis"
import { NextResponse } from "next/server"

const redis = createRedisAdapter({
  url: "redis://localhost:6379",
  namespace: "nextdemo",
  jsonIndexableFields: {
    users: ["email", "role"],
  },
})

export async function GET() {
  await redis.insertOne("users", {
    _id: "u1",
    email: "user@test.com",
    role: "admin",
  })

  const { docs, count } = await redis.find("users", { role: "admin" })
  console.log({ docs, count })
  return NextResponse.json({ users: docs })
}
