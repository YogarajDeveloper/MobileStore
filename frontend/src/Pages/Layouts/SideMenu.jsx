import React from 'react'
import {
  Users,
  Package,
  Settings,
  Smartphone,
  ArrowDownToLine,
  LayoutDashboard,
  ArrowUpFromLine,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

export const SideMenu = () => {

  const navigate =useNavigate()
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
      name: 'Stock In',
      path: '/stock-in',
      icon: ArrowDownToLine,
    },
    {
      name: 'Stock Out',
      path: '/stock-out',
      icon: ArrowUpFromLine,
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: Users,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ]

  return (
    <>
      <div className='h-22 border-lightGreen border-b flex items-center justify-center gap-2 hover:cursor-pointer' onClick={()=> navigate("/dashboard")}>
        <Smartphone size={28} color='#F3F7F6' />
        <span className="text-xl font-bold text-secondary">TM</span>
      </div>

      <div className="flex flex-col gap-2 text-secondary p-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl p-3 transition-all ${isActive
                  ? "bg-secondary text-primary"
                  : "hover:bg-lightGreen"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  )
}
