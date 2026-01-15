import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'profile',
        element: <Profile />
      },
    ]
  }

]);

export default function App() {
  return <RouterProvider router={router} />
}
