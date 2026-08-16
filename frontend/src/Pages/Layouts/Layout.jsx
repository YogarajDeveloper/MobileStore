import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SideMenu } from './SideMenu'
import { Smartphone ,LogOut} from 'lucide-react'
import Modal from '../../CommonComponents/Modal'

const Layout = () => {

  const navigate = useNavigate();
  const [logoutModel,setLogoutModel] =useState(false);

  const handleLogout =()=>{
    sessionStorage.removeItem("auth")
    navigate("/")
  }

  return (
    <div className='min-h-screen w-full flex flex-col bg-secondary'>
      {/* header */}
      <div className='h-20 flex items-center justify-between gap-3 p-5 border border-r-0 border-b-fuchsia-100' 
      onClick={(e) => {
        navigate("/dashboard")
        console.log("Parent clicked")
      }}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center shadow-sm text-secondary bg-loginBg" >
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">MobilePro</span>
        </div>

        <div className='flex items-center gap-2 cursor-pointer' 
        onClick={(e) => {
          e.stopPropagation();
          setLogoutModel(true);
        }}>
          
          <span>
            <LogOut size={27} /></span>
            <p >Logout</p>
        </div>
      </div>
      {/* sidemenu */}
      <div className='flex h-[calc(100vh-80px)]'>
        <div className='border-r border-r-fuchsia-100 w-60'>
          <SideMenu />
        </div>
        <div className='flex-1 bg-white h-full overflow-y-auto'>
          <Outlet />
        </div>

      </div>
      {
        
        <Modal 
          logout
          divider={false}
          isOpen={logoutModel} 
          actionButton={"Logout"}
          onAction={()=>handleLogout()}
          onClose={()=>setLogoutModel(false)} 
          title={"Are you sure want to logout?"} 
        >
        </Modal>
      }
    </div>)
}

export default Layout
