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
import ProtectedRoute from "./components/ProtectedRoute";




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:id',
        element: (
          <ProtectedRoute>
            <OtherProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'addpost',
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: 'editpost',
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:id",
        element: (
          <ProtectedRoute>
            <SinglePost />
          </ProtectedRoute>
        ),
      },
      {
        path: 'search',
        element: (
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        ),
      },
    ],
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
