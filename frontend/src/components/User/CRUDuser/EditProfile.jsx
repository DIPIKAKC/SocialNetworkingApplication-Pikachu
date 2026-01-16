
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from "formik"



export default function EditProfile({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <Card className="w-120 h-fit relative">
                <CardHeader className={"flex flex-row items-center justify-between"}>
                    <CardTitle>Edit your Post</CardTitle>
                    <button onClick={onClose} className="text-gray-500 cursor-po">✕</button>

                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{
                        }}
                        onSubmit={async (val) => {
                        }}
                    >
                        {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Username</Label>
                                        <Input
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            id="title"
                                            type="text"
                                            placeholder="Write a caption"
                                            className={'border-none'}
                                        />
                                        {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Email</Label>
                                        <Input
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            id="title"
                                            type="text"
                                            placeholder="email"
                                            className={'border-none'}
                                        />
                                        {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Bio</Label>
                                        <Input
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            id="title"
                                            type="text"
                                            placeholder="bio"
                                            className={'border-none'}
                                        />
                                        {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Change Profile picture</Label>
                                        <Input
                                            name="image"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setFieldValue('imageReview', URL.createObjectURL(file));
                                                setFieldValue('image', file);
                                            }}

                                            id="image"
                                            type="file"
                                            className={'h-40'}
                                        />
                                        {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
                                        {values.imageReview && !errors.image && <img src={values.imageReview} alt="" />}
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



        </div>
    )
}



