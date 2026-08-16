import React from 'react'
import TextInput from '../../CommonComponents/TextInput'

const UserForm = ({ formdata, setFormdata }) => {

    const handleOnchange = (data) => {
        setFormdata((prev) => ({
            ...prev,
            [data.target.name]: data?.target?.value,
        }));
    };
    
  return (
    <div>
      <div className='flex gap-2'>
                <TextInput
                    name="name"
                    label="Name"
                    value={formdata.name}
                    placeholder="Enter Name"
                    onChange={handleOnchange}
                />
                <TextInput
                    name="email"
                    label="Email"
                    value={formdata.email}
                    placeholder="Enter Email"
                    onChange={handleOnchange}
                />
            </div>
            <div className='flex gap-2'>
                <TextInput
                    name="password"
                    label="Password"
                    value={formdata.password}
                    onChange={handleOnchange}
                    placeholder="Enter Password"
                />
                <TextInput
                    name="phone"
                    label="Phone"
                    value={formdata.phone}
                    placeholder="Enter phone"
                    onChange={handleOnchange}
                />
            </div>
    </div>
  )
}

export default UserForm