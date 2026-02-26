import { QUERY } from "@/floweden/flow"
import { useQuery } from "@apollo/client/react"

export function useCurrentUser() {
  const { data, loading, refetch } = useQuery(QUERY.CURRENT_USER)
  const currentUser = data?.currentUser

  const isAdmin = currentUser?.roles?.includes("ADMIN")

  return {
    isAdmin,
    currentUser,
    loading,
    refetch,
  }
}
