import React from 'react'
import {
  Users,
  Package,
  Settings,
  LayoutDashboard,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

export const SideMenu = () => {

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
    },
    {
      name: 'Users',
      path: '/users',
      icon: Users,
    },
    {
      name: 'AI',
      path: '/ai',
      icon: Settings,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-2 p-5">
        <span className='tracking-wider font-semibold text-slate-400 text-[11px]'>MAIN MENU</span>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item?.path}
              to={item?.path}
              className={({ isActive }) =>`flex items-center gap-4 rounded-xl p-4 transition-all  ${isActive ? "bg-loginBg text-white" : "hover:bg-secondary"}`
              }
            >
              <Icon size={20} />
              <span>{item?.name}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  )
}
