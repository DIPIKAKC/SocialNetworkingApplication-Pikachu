import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import CreatePost from "./components/User/CRUDpost/CreatePost";
import EditPost from "./components/User/CRUDpost/EditPost";
import Login from "./pages/APIs/Authentication/Login";
import Signup from "./pages/APIs/Authentication/Signup";
import AuthLayout from "./components/AuthLayout";
import SinglePost from "./pages/User/SinglePost";
import OtherProfile from "./pages/User/OtherProfile";
import Search from "./pages/User/Search";




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
      {
        path: 'profile/:id',
        element: <OtherProfile />
      },


      // POST
      {
        path: 'addpost',
        element: <CreatePost />
      },
      {
        path: 'editpost',
        element: <EditPost />
      },
      {
        path: "posts/:id",
        element: <SinglePost />,
      },


      //SEARCH
      {
        path: 'search',
        element: <Search />
      },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Signup /> },
    ],
  },

]);

export default function App() {
  return <RouterProvider router={router} />
}
