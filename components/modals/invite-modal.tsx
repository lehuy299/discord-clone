"use client";

import * as z from "zod";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const { server } = data;

  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center gap-x-2 mt-2">
            <Input 
              value={inviteUrl}
              className="bg-zinc-300/50 text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button size='icon'>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant='link'
            size='sm'
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal;
