import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginOptions = () => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-col'> 
      <div>LG Page</div>

      <button onClick={() => navigate('/register')}>
        Register
      </button>
      <h3>Already acc is there pls login</h3>
      <button onClick={() => navigate('/login')}>Login</button></div>
  )
}

export default LoginOptions