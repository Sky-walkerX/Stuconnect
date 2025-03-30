import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw, UserPlus } from "lucide-react";
import { useState } from "react";
import { generateNewInviteCode } from '@/app/apiCalls';

interface ServerModalProps {
    inviteCode: string;
    serverId: string; // Ensure we pass serverId as a prop
}

const InvitePeopleModal = ({ inviteCode, serverId }: ServerModalProps) => {
    const [copied, setCopied] = useState(false);
    const [currentInvite, setCurrentInvite] = useState(inviteCode);

    const onCopy = () => {
        navigator.clipboard.writeText(currentInvite);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    // No parameter here; using serverId from props.
    const handleGenerateNewLink = async () => {
        try {
            const newInviteResponse = await generateNewInviteCode(serverId);
            // Assuming your API returns the new invite code directly, update the state.
            setCurrentInvite(newInviteResponse.inviteCode);
        } catch (error) {
            console.error("Failed to regenerate invite code:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='w-auto hover:text-blue-400 flex text-md px-3 items-center h-10 border-neutral-200 rounded-md mx-1 dark:border-neutral-800 border-2 dark:bg-zinc-700/50 transition'>
                    Invite People
                    <UserPlus className="w-4 h-4 m-1 rounded-sm" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-0 overflow-hidden">
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className="text-2xl mt-6 text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                        Server Invite Link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                            value={currentInvite}
                            readOnly={true}
                        />
                        <Button size="icon" onClick={onCopy}>
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button
                        onClick={handleGenerateNewLink}
                        variant="link"
                        size="sm"
                        className="text-xs text-white mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InvitePeopleModal;
