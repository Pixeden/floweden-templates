import { kinds } from "@/floweden/config"
import {
  generateMutations,
  generateQueries,
  makeClient,
} from "@floweden/client"
import { loggedOutResponse } from "@floweden/utils"

export const MUTATION = generateMutations(kinds)

export const QUERY = generateQueries(kinds)

export async function logout() {
  async function action() {
    const client = makeClient()
    await client.cache.reset()
  }
  return loggedOutResponse(action)
}
