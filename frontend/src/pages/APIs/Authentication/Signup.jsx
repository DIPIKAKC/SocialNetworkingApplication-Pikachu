import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Formik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import * as Yup from 'yup';
import { useState } from "react"
import { LockKeyhole, LockKeyholeOpenIcon } from "lucide-react"
import { useUserRegisterMutation } from "./authApi"

const registerShcema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).required(),
    username: Yup.string().required(),
    profilePicture: Yup.mixed()
        .test('fileSize', 'File too large (max 5MB)', (value) => {
            return !value || value.size <= 5000000;
        })
        .test('fileType', 'Unsupported file type', (value) => {
            return !value || ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type);
        })
});

export default function Signup() {
    const nav = useNavigate();
    const [userRegister, { isLoading }] = useUserRegisterMutation();
    const [show, setShow] = useState(false);
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Signup to your account</CardTitle>
                <CardDescription>
                    Enter your email below to register your account
                </CardDescription>
                <CardAction>
                    <Button onClick={() => nav(-1)} variant="link">Login</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        profilePicture: null,
                        profilePicturePreview: null,
                    }}

                    onSubmit={async (values) => {
                        try {
                            const formData = new FormData();
                            formData.append("username", values.username);
                            formData.append("email", values.email);
                            formData.append("password", values.password);
                            formData.append("profilePicture", values.profilePicture);

                            const response = await userRegister(formData).unwrap();
                            toast.success("User Registered Successfully");
                            nav("/login");
                        } catch (error) {
                            toast.error(error?.data?.data || error?.data?.message || "Registration failed");
                        }
                    }}


                    validationSchema={registerShcema}
                >
                    {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (

                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">

                                {/* Username */}
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="your name"
                                        value={values.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && touched.username && (
                                        <p className="text-red-500">{errors.username}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={show ? "text" : "password"}
                                            placeholder="******"
                                            className="pr-9"
                                            value={values.password}
                                            onChange={handleChange}
                                        />

                                        <Button
                                            type="button"
                                            onClick={() => setShow(!show)}
                                            variant="ghost"
                                            size="icon"
                                            className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                                        >
                                            {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}
                                        </Button>
                                    </div>
                                    {errors.password && touched.password && (
                                        <p className="text-red-500">{errors.password}</p>
                                    )}
                                </div>


                                {/* profilePicture */}
                                <div className="grid gap-2">
                                    <Label htmlFor="profilePicture">Change Profile Picture</Label>

                                    <Input
                                        id="profilePicture"
                                        name="profilePicture"
                                        type="file"
                                        accept="image/*"
                                        className="h-40"
                                        onChange={(e) => {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            setFieldValue("profilePicturePreview", URL.createObjectURL(file));
                                            setFieldValue("profilePicture", file);
                                        }}
                                    />

                                    {touched.profilePicture && errors.profilePicture && (
                                        <p className="text-red-500">{errors.profilePicture}</p>
                                    )}

                                    {values.profilePicturePreview && !errors.profilePicture && (
                                        <img
                                            src={values.profilePicturePreview}
                                            alt="Preview"
                                            className="h-32 w-32 rounded-full object-cover"
                                        />
                                    )}
                                </div>



                                {/* Submit */}
                                <div className="grid gap-2">
                                    {isLoading ? (
                                        <Button size="sm" variant="outline" disabled className="w-full mt-5">
                                            <Spinner />
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full">
                                            Signup
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>

                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}