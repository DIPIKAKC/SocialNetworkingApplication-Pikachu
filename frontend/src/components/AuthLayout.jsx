import { Outlet } from 'react-router-dom'
import LandingHeader from './LandingHeader'

export default function AuthLayout() {
  return (
    <>
      <LandingHeader />
      <Outlet />
    </>
  )
}
