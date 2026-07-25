import React from 'react'
import { SideMenu } from './SideMenu'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='min-h-screen flex bg-primary'>
      {/* sidemenu */}
        <div className='bg-primary w-[14%]'>
          <SideMenu />
        </div>
        {/* main */}
        <div className='bg-secondary flex-1'>
          <Outlet />
        </div>
    </div>
  )
}
