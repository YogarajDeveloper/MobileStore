import axios from 'axios';
import { useSelector } from 'react-redux';
import { Edit, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '../../customHooks/api';
import Pagination from '../../CommonComponents/Pagination'

import ProductForm from './ProductForm';
import Modal from '../../CommonComponents/Modal';
import DataTable from '../../CommonComponents/DataTable';

const Products = () => {

  const [userId, setUserId] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    pageIndex: 0,
    pageSize: 20,
    totalPages: 0,
    total: 0,
  });

  const [formdata, setFormdata] = useState({
    brand: "",
    model: "",
    ram: "",
    rom: "",
    price: ""
  });

  const handleEdit = (data) => {
    setIsAddProductModalOpen(true);
    setFormdata((prev) => ({
      ...prev,
      brand: data?.brand,
      model: data?.model,
      ram: data?.ram,
      rom: data?.rom,
      price: data?.price
    }))
    setUserId(data?.id)
  }

  const handleDelete = (data) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${data.brand}?`
    );

    if (confirmDelete) {
      deleteProductMutate(data.id);
    }
  };

  const col = [
    {
      header: "BRAND",
      accessorKey: "brand",
    },
    {
      header: "MODEL",
      accessorKey: "model",
    },
    {
      header: "RAM",
      accessorKey: "ram",
    },
    {
      header: "ROM",
      accessorKey: "rom",
    },
    {
      header: "PRICE",
      accessorKey: "price",

    },
    {
      header: "ACTIONS",
      // enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleEdit(row.original)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <Edit size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleDelete(row.original)}
            className="text-red-600 hover:text-red-800 cursor-pointer h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ]

  const addProduct = async (data) => {
    try {
      const payload = data;
      const endpoint = "product/store";

      return response = await api.post(endpoint, payload);

    } catch (error) {
      console.log("Error fetching products:", error?.response);
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.post("/product/get-all", {
        page: paginationData.pageIndex,
        size: paginationData.pageSize,
      });
      return response.data;
    } catch (error) {
      console.log("Error:", error.response || error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data;
  };

  const { mutate: deleteProductMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    },

    onError: (error) => {
      console.log("Delete error:", error?.response || error);
    }
  });

  const { data, error, isError, isLoading, isSuccess, } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const { mutate: addProductMutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      setIsAddProductModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
      setUserId("");

    },
    onError: (error) => {
      console.log("Error adding product:", error?.response);
    },
  });

  const formSubmit = (formdata) => {
    addProductMutate(formdata);
  };

  return (
    <div className='flex flex-col gap-5 p-5'>

      <div className='flex justify-between'>
        <div className='text-black flex flex-col'>
          <span className='text-[25px] font-bold'>Products</span>
          <span className='text-[15px] text-slate-900'>Manage all mobile products and catalog inventory</span>
        </div>

        <div>
          <button className='bg-loginBg p-3 rounded-2xl text-white' onClick={() => setIsAddProductModalOpen(true)}>+Add Products</button>
        </div>
      </div>

      <div className='h-[calc(100vh-260px)]'>
        <DataTable
          data={data?.content || []}
          columns={col}
          isRowClick={true}
          hover={true}
          cursor={true}
        />
        {/* <Pagination
          paginationData={paginationData}
          setPaginationData={setPaginationData}
          isRounded={true}  
        /> */}
      </div>
      {
        (
          <Modal
            title="Add Product"
            actionButton="Add Product"
            isOpen={isAddProductModalOpen}
            onAction={() => formSubmit(formdata)}
            onClose={() => setIsAddProductModalOpen(false)}
          >
            <ProductForm formdata={formdata} setFormdata={setFormdata} />
          </Modal>
        )

      }

    </div>

  );
};

export default Products;