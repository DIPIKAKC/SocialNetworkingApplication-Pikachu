
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCreatePostMutation } from "@/pages/APIs/PostApi/postApi";
import { Formik, validateYupSchema } from "formik"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from 'yup'

const valSchema = Yup.object({
  content: Yup.string().min(4).required(),

  image: Yup.mixed()
    .nullable()
    .required('Image is required')
    .test(
      'fileType',
      'Unsupported file format',
      (val) =>
        val &&
        ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type)
    )
    .test(
      'fileSize',
      'File is too large',
      (val) => val && val.size <= 5 * 1024 * 1024
    ),
});


export default function CreatePost({ onClose }) {
  const [createProduct, { isLoading }] = useCreatePostMutation();
  const user = useSelector((state) => state.userSlice);
  const nav = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <Card className="w-120 h-100 relative">
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <CardTitle>Create your Post</CardTitle>
          <Button onClick={onClose} variant="ghost" className="text-gray-500 cursor-po">✕</Button>

        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              content: '',
              image: null,
              imageReview: '',
            }}
            onSubmit={async (val) => {
              try {
                const formData = new FormData();
                formData.append('content', val.content);
                formData.append('image', val.image);
                await createProduct({
                  token: user.token,
                  body: formData
                }).unwrap();
                toast.success('Post created successfully');
                onClose();
                nav('/');
              } catch (err) {
                console.log("RTK ERROR:", err);
                toast.error( err?.data?.data || err?.data?.message || "Something went wrong");
              }

            }}
            validationSchema={valSchema}
          >
            {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">

                  <div className="">
                    <Input
                      name="content"
                      onChange={handleChange}
                      value={values.content}
                      id="content"
                      type="text"
                      placeholder="Write a caption"
                      className={'border-none'}
                    />
                    {touched.content && errors.content && <p className="text-red-500">{errors.content}</p>}
                  </div>


                  <div className="space-y-2">
                    {/* File input – show ONLY if no image selected */}
                    {!values.imageReview && (
                      <Input
                        name="image"
                        id="image"
                        type="file"
                        accept="image/*"
                        className="cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          setFieldValue('imageReview', URL.createObjectURL(file));
                          setFieldValue('image', file);
                        }}
                      />
                    )}

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

                        {/* Optional: Change image button */}
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
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      Create Post
                    </Button>
                  </div>
                  {/* } */}


                </div>

              </form>


            )}
          </Formik>







        </CardContent>

      </Card>



    </div>
  )
}



