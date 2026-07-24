import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const LoginLayout = () => {

  const navigate = useNavigate();

  return (
    <div className='flex'>
      <div>LG Page</div> <br />

      <button onClick={() => navigate('/register')}>
        Register
      </button>
      <h3>Already acc is there pls login</h3>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  );
}

export default LoginLayout;