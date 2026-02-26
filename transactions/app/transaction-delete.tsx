import { Button } from "@/components/ui/button"
import { MUTATION, QUERY } from "@/floweden/flow"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useMutation } from "@apollo/client/react"
import { Trash2 } from "lucide-react"

interface Props {
  id: string
}

export function DeleteTransaction({ id }: Props) {
  const { currentUser } = useCurrentUser()
  const [deleteTransaction, { loading }] = useMutation(
    MUTATION["DELETE_TRANSACTION"] as any,
    { refetchQueries: [{ query: QUERY["GET_ALL_TRANSACTION"] as any }] },
  )

  return currentUser ? (
    <Button
      variant="ghost"
      className="text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
      onClick={() => deleteTransaction({ variables: { id } })}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  ) : null
}
