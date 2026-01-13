import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Dashboard />
      // }
    ]
  }

]);

export default function App() {
  return <RouterProvider router={router} />
}
