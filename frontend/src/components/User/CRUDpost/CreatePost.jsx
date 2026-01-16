
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Formik } from "formik"
// import * as Yup from 'yup'
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router"
// import { useCreateProductMutation } from "../../../Authentication/AuthApi/productsApi"
// import toast from "react-hot-toast"


// const valSchema = Yup.object({
//     title: Yup.string().min(4).required(),
//     detail: Yup.string().min(10).required(),
//     price: Yup.string().required(),
//     category: Yup.string().required(),
//     brand: Yup.string().required(),
//     image: Yup.mixed()
//         .test('fileType', 'Unsupported File Format', (val) => {
//             return val && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type);
//         })
//         .test('fileSize', 'file is too large', (val) => {
//             return val && val.size <= 5 * 1024 * 1024;
//         })
//         .required(),
// });


export default function CreatePost({ onClose }) {
  // const nav = useNavigate();
  // const { user } = useSelector((state) => state.userSlice)
  // const [createProduct, { isLoading }] = useCreateProductMutation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <Card className="w-120 h-100 relative">
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <CardTitle>Create your Post</CardTitle>
          <button onClick={onClose} className="text-gray-500 cursor-po">✕</button>

        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              // title: '',
              // detail: '',
              // price: '',
              // category: '',
              // brand: '',
              // image: '',
              // imageReview: '',
              // stock:''
            }}
            onSubmit={async (val) => {
              // try {
              //     const formData = new FormData();
              //     formData.append('title', val.title);
              //     formData.append('detail', val.detail);
              //     formData.append('price', val.price);
              //     formData.append('category', val.category);
              //     formData.append('brand', val.brand);
              //     formData.append('image',  val.image);
              //     formData.append('stock',  val.stock);
              //     await createProduct({
              //         token: user.token,
              //         body: formData
              //     }).unwrap();
              //     toast.success('Product added successfully');
              //     nav(-1);
              // } catch (err) {
              //     toast.error(err.data.message);
              // }
            }}
          // validationSchema={valSchema}
          >
            {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">

                  <div className="grid gap-2">
                    {/* <Label htmlFor="title">Write your caption</Label> */}
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


                  <div className="">
                    {/* <Label htmlFor="image">Select an image</Label> */}
                    <Input
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue('imageReview', URL.createObjectURL(file));
                        setFieldValue('image', file);
                      }}

                      id="image"
                      type="file"
                      className={'h-45'}
                    />
                    {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
                    {values.imageReview && !errors.image && <img src={values.imageReview} alt="" />}
                  </div>

                  {/* {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                    <Spinner />
                    Create Post
                  </Button> :  */}
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Post
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



