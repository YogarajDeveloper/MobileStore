import React, { useState } from 'react'

const Settings = () => {
  const [formdata, setFormdata] = useState({
    aiText: "",
  });

  const handleOnchange = (data) => {
    setFormdata((prev) => ({
      ...prev,
      [data.target.name]: data?.target?.value,
    }));
  };

  return (

    <>
      <label>AI Text</label>  <br />
      <input className='border-amber-200 border' name="aiText" value={formdata.aiText} type="text" onChange={handleOnchange} />
      <button onClick={() => {}}>send</button>
    </>
  )
}

export default Settings