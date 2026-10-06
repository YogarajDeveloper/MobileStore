import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const LoginLayout = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full flex'>
      <div className="w-[50%] flex justify-center items-center bg-custom-grad">
        <div className="font-bold w-[90%] h-full text-gray-50 flex flex-col p-12 justify-around">
          {/* logo */}
          
          {/* headelines */}
          <section className='flex flex-col'>
            <span className='text-[21px] '>
              Welcome to Thamizhan Mobiles
            </span>
            <span className='text-[15px] w-[60%] '>
              Track tasks, collaborate with your team, and ship
              faster with a single clean workspace
            </span>
          </section>
         
        </div>

      </div>
      <div className='w-[50%] flex justify-center items-center bg-loginWhite'>
        <div className='w-[55%]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;