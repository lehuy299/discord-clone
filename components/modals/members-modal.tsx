"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import qs from 'query-string';
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "../user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const InviteModal = () => {
  const roleIconMap = {
    ADMIN: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
    MODERATOR: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    GUEST: null
  }
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "members";

  const onRoleChange = async (memberId: string, role: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id
        }
      });
      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id
        }
      });
      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingId("");
    }
  };
  
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
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
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
              {member.profileId !== server.profileId &&
                member.id !== loadingId && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical className="w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => member.role !== "GUEST" && onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                <span>Guest</span>
                                {member.role === "GUEST" && <Check className="w-4 h-4 ml-auto" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => member.role !== "MODERATOR" &&  onRoleChange(member.id, "MODERATOR")}
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                <span>Moderator</span>
                                {member.role === "MODERATOR" && <Check className="w-4 h-4 ml-auto" />}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                        >
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {member.id === loadingId && (
                  <Loader2 className="animate-spin text-zinc-500 w-4 h-4 ml-auto" />
                )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal;
