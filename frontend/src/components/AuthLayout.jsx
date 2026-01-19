import { Navigate, Outlet } from 'react-router-dom'
import LandingHeader from './LandingHeader'

export default function AuthLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  // if user is logged in, redirect to home
  if (user?.token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <LandingHeader />
      <Outlet />
    </>
  )
}
