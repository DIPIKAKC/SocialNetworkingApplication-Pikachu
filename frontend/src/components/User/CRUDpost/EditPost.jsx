
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUpdatePostMutation } from "@/pages/APIs/PostApi/postApi";
import { userSlice } from "@/pages/Slice/userSlice";
import { Formik } from "formik"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";



export default function EditPost({ onClose, post }) {

  const nav = useNavigate();
  const tokenRtk = useSelector((state)=>state.userSlice.token)
  console.log("token rtk:",tokenRtk)
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <Card className="w-120 h-100 relative">
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <CardTitle>Edit your Post</CardTitle>
          <button onClick={onClose} className="text-gray-500 cursor-po">✕</button>

        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              content: post.content,
              image: '',
              imageReview: post.image,
            }}
            onSubmit={async (val) => {
              try {
                const formData = new FormData();
                formData.append('content', val.content);
                formData.append('image', val.image);
                console.log(formData)
                await updatePost({
                  id: post._id,
                  token: tokenRtk,
                  body: formData
                }).unwrap();
                toast.success('Product edited successfully');
                onClose();
                nav('/');
              } catch (err) {
                console.log(err)
                toast.error( err?.data?.data || err?.data?.message);
              }
            }}
          >
            {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">

                  <div className="grid gap-2">
                    <Input
                      name="content"
                      onChange={handleChange}
                      value={values.content}
                      id="content"
                      type="text"
                      // placeholder="Write a caption"
                      className={'border-none'}
                    />

                    {touched.content && errors.content && <p className="text-red-500">{errors.content}</p>}
                  </div>


                  <div className="">
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
                      Confirm update
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



