
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetUserQuery, useUpdateUserMutation } from "@/pages/APIs/UserApi/userApi"
import { Formik } from "formik"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import * as Yup from 'yup'


export default function EditProfile({ onClose }) {
    const { user } = useSelector((state) => state.userSlice);
    const { isLoading, data, error } = useGetUserQuery()
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
    console.log(user)
    if (isLoading) return <div className="flex gap-2 items-end">
        <h3>Loading</h3>
        <Spinner />
    </div>
    if (error) return <p className="text-pink-500">{error.data.message}</p>
    // console.log("username:,", data?.user?.username || '',)

    const loginShcema = Yup.object({
        email: Yup.string().email().required(),
        username: Yup.string().min(3).required()
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <Card className="w-120 h-fit relative">
                <CardHeader className={"flex flex-row items-center justify-between"}>
                    <CardTitle>Edit your Profile</CardTitle>
                    <button onClick={onClose} className="text-gray-500 cursor-po">✕</button>

                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{
                            username: data?.user?.username || '',
                            email: data?.user?.email || '',
                            bio: data?.user?.bio || '',
                            profilePicture: null, //for the new profilePicture file
                            profilePictureReview: data?.user?.profilePicture || '', //existing image show
                        }}
                        onSubmit={async (val) => {
                            try {
                                const formData = new FormData();
                                formData.append('username', val.username);
                                formData.append('email', val.email);
                                formData.append('bio', val.bio);
                                formData.append('profilePicture', val.profilePicture);

                                await updateUser({
                                    id: user.id,
                                    formData
                                }).unwrap();
                                toast.success('Update successful');
                                onClose();
                            } catch (error) {
                                toast.error(error.data.message);
                            }
                        }}
                        validationSchema={loginShcema}

                    >
                        {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">

                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            name="username"
                                            onChange={handleChange}
                                            value={values.username}
                                            id="username"
                                            type="text"
                                            className={'border-none'}
                                        />
                                        {touched.username && errors.username && <p className="text-red-500">{errors.username}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            id="email"
                                            type="text"
                                            className={'border-none'}
                                        />
                                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input
                                            name="bio"
                                            onChange={handleChange}
                                            value={values.bio}
                                            id="bio"
                                            type="text"
                                            className={'border-none'}
                                        />
                                        {touched.bio && errors.bio && <p className="text-red-500">{errors.bio}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="profilePicture">Change Profile picture</Label>
                                        <Input
                                            id="profilePicture"
                                            name="profilePicture"
                                            type="file"
                                            accept="image/*"
                                            className="cursor-pointer"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setFieldValue('profilePictureReview', URL.createObjectURL(file));
                                                setFieldValue('profilePicture', file);
                                            }}

                                        />
                                        {/* Error message */}
                                        {touched.image && errors.image && (
                                            <p className="text-sm text-red-500">{errors.image}</p>
                                        )}

                                        {/* Image Preview */}
                                        {values.imageReview && !errors.image && (
                                            <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
                                                <img
                                                    src={values.imageReview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* image change */}
                                                <button
                                                    type="button"
                                                    className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                                                    onClick={() => {
                                                        setFieldValue('imageReview', '');
                                                        setFieldValue('image', null);
                                                    }}
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        )}
                                    </div>


                                    <div className="flex justify-end mt-4 gap-2">
                                        <Button variant="ghost" onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button className="bg-blue-500 hover:bg-blue-600">
                                            Save Changes
                                        </Button>
                                    </div>

                                </div>

                            </form>


                        )}
                    </Formik>







                </CardContent>

            </Card>



        </div >
    )
}



