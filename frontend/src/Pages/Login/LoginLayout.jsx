import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const LoginLayout = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full flex'>
      <div className="w-[50%] flex justify-center items-center bg-thamizhan-gradientTop">
        <span className="text-[21px] font-bold text-black">
          Welcome to Thamizhan Mobiles
        </span>
      </div>
      <div className='w-[50%] bg-thamizhan-gradientRight flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;