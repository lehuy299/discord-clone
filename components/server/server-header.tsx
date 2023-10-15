"use client"

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole
}

export const ServerHeader = ({
  server,
  role
}: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="focus:outline-none"
          asChild
        >
          <button className="text-md font-semibold h-12 w-full px-3 flex items-center justify-between border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDown className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
        >
          {isModerator && (
            <DropdownMenuItem
            onClick={() => onOpen("invite")}
              className="px-3 py-2 text-sm text-indigo-500 dark:text-indigo-400 cursor-pointer"
            >
              Invite People
              <UserPlus className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Server Settings
              <Settings className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Manage Members
              <Users className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Create Channel
              <PlusCircle className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuSeparator />
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
            >
              Delete Server
              <Trash className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
            >
              Leave Server
              <LogOut className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}