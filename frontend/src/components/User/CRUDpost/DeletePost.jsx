import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner';
import { useRemovePostMutation } from '@/pages/APIs/PostApi/postApi';
import { removeUser } from '@/pages/Slice/userSlice';
import { TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


export default function DeletePost({ id, open, onOpenChange }) {
    const user = useSelector((state) => state.userSlice);
    console.log("token", user.token)
    const [removePost, { isLoading }] = useRemovePostMutation();
    const dispatch = useDispatch();
    const handleRemovePost = async () => {
        try {
            await removePost({ id, token: user.token }).unwrap();
            toast.success('Post deleted successfully');
            dispatch(removeUser());
            onOpenChange(false);
        } catch (error) {
            toast.error(error?.data?.data || error?.data?.message);
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemovePost}>ConFirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            =        </AlertDialog>
    )
}
