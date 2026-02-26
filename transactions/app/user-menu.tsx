"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/floweden/flow"
import { useCurrentUser } from "@/hooks/use-current-user"
import { cn } from "@/lib/utils"
import { Loader2Icon, SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  className?: string
}

export function UserMenu({ className }: Props) {
  const { currentUser, refetch, loading, isAdmin } = useCurrentUser()

  return currentUser ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative text-base", className)}
        >
          <UserIcon />
          {isAdmin ? (
            <Badge
              className="absolute -right-2 -top-2 z-10 rounded-full border-none bg-white p-1 text-xs text-blue-500"
              variant="outline"
            >
              <SettingsIcon />
            </Badge>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-left" align="end">
        <DropdownMenuLabel>
          Hello,
          <br />
          <strong>{currentUser.name || currentUser.email}</strong>{" "}
          {isAdmin ? "[admin]" : ""}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            await logout()
            await refetch()
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      size={loading ? "icon" : "default"}
      className={cn(
        "text-base font-semibold",
        loading
          ? "bg-transparent text-blue-500"
          : "bg-blue-700 hover:bg-blue-600",
        className,
      )}
      asChild={loading ? false : true}
    >
      {loading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <Link href="/login">Login</Link>
      )}
    </Button>
  )
}
