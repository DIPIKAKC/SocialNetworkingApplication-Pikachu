import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Home from '@/pages/User/Home'

export default function RootLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
