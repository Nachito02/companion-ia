'use client'
import { Companion, Message } from "@prisma/client"
import { Button } from "./ui/button";
import { ChevronLeft, Edit, MessageSquare, MoreVertical, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import BotAvatar from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface ChatHeadersProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
}


const ChatHeader = ({ companion }: ChatHeadersProps) => {
    const { user } = useUser();
    const router = useRouter();
    const {toast} = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`);
            toast({
                description: "Success"
            })
            router.refresh();
            router.push('/');
        }catch (error) {
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }
    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <BotAvatar src={companion.src} />

                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>

                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Created by {companion.userName}
                        </p>
                    </div>
                </div>
            </div>

            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" >
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={onDelete}>
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default ChatHeader