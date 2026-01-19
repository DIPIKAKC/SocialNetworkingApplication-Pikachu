import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, ShoppingCart, LayoutDashboard, ListOrderedIcon, Edit2Icon, DeleteIcon, EllipsisIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditPost from './EditPost';
import { useState } from 'react';
import DeletePost from './DeletePost';

export default function EditPostDropdown({ post, id }) {
    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' className='overflow-hidden rounded-full'>
                        <EllipsisIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setOpen(true)}>
                            <Edit2Icon />
                            <span>Edit Post</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setOpenDel(true)}>
                            <DeleteIcon />
                            <span>Delete Post</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {open && <EditPost post={post} onClose={() => setOpen(false)} />}
            {openDel && <DeletePost
                id={id}
                open={openDel}
                onOpenChange={setOpenDel} />}
        </>
    );
}