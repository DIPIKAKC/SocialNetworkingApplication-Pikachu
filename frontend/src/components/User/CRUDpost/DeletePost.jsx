// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger
// } from '@/components/ui/alert-dialog'
// import { Button } from '@/components/ui/button'


// export default DeletePost = ({ id }) => {
//     // const { user } = useSelector((state) => state.userSlice);
//     // const [removeProduct, { isLoading }] = useRemoveProductMutation();

//     // const handleRemoveProduct = async () => {
//     //     try {
//     //         await removeProduct({ id, token: user.token }).unwrap();
//     //         toast.success('Product removed successfully');
//     //     } catch (error) {
//     //         toast.error(error.message);
//     //     }
//     // }
//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button className={'bg-red-700'} disabled={isLoading}>
//                     {/* {isLoading ? <Spinner /> : <TrashIcon />} */}
//                 </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete the post.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={handleRemoveProduct}>ConFirm</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }
