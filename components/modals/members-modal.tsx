"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "../user-avatar";
import { MoreVertical, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuPortal, 
  DropdownMenuSub, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger, 
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const InviteModal = () => {
  const roleIconMap = {
    ADMIN: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
    MODERATOR: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    GUEST: null
  }
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState();

  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          {server?.members?.map(member => (
            <div className="flex items-center gap-x-2 mb-6">
              <UserAvatar imageUrl={member.profile.imageUrl} />
              <div>
                <div className="flex gap-x-1 text-xs font-semibold">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  {member.profile.email}
                </p>
              </div>
              {member.id !== server.profileId && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="w-4 h-4 text-zinc-500"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left" className="w-56">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>More...</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal;
