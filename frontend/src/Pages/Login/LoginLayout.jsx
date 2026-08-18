import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const LoginLayout = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full flex'>
      <div className="w-[50%] flex justify-center items-center bg-gradient-to-r from-login-bg-left to-login-bg-right">
        <div className="font-bold w-[90%] h-full text-headline flex flex-col p-12 justify-around">
          {/* logo */}
          <section>
            <div className=' rounded-2xl'>
              Logo TM
            </div>
          </section>
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
          {/* dumy design */}
          <section>
            <pre>--*--   @copy   --*-- </pre>
          </section>
        </div>

      </div>
      <div className='w-[50%] flex justify-center items-center bg-loginBg'>
        <div className='w-[55%]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;