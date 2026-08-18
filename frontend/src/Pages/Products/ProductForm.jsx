import React, { useEffect, useState } from 'react'
import TextInput from '../../CommonComponents/TextInput'

const ProductForm = ({ formdata, setFormdata  }) => {

    const handleOnchange = (data) => {
        setFormdata((prev) => ({
            ...prev,
            [data.target.name]: data?.target?.value,
        }));
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <TextInput
                    label="Brand"
                    name="brand"
                    onChange={handleOnchange}
                    value={formdata.brand}
                    placeholder="Enter Brand"
                />
                <TextInput
                    label="Model"
                    name="model"
                    onChange={handleOnchange}
                    value={formdata.model}
                    placeholder="Enter Model"
                />
            </div>
            <div className='flex gap-2'>
                <TextInput
                    label="RAM"
                    name="ram"
                    value={formdata.ram}
                    onChange={handleOnchange}
                    placeholder="Enter RAM"
                />
                <TextInput
                    label="ROM"
                    name="rom"
                    value={formdata.rom}
                    onChange={handleOnchange}
                    placeholder="Enter ROM"
                />
            </div>
            <div>
                <TextInput
                    label="Price"
                    name="price"
                    value={formdata.price}
                    onChange={handleOnchange}
                    placeholder="Enter Price"
                />
            </div>
        </div>
    )
}

export default ProductForm