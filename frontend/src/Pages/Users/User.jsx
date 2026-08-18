import React, { useState } from 'react'
import { Edit, Trash } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../../customHooks/api';

import UserForm from './UserForm';
import Modal from '../../CommonComponents/Modal';
import DataTable from '../../CommonComponents/DataTable';

const User = () => {
    const queryClient = useQueryClient();
    const [userId, setUserId] = useState("");
    const [isFormModel, setIsFormModel] = useState(false);
    const [paginationData, setPaginationData] = useState({
        pageIndex: 0,
        pageSize: 30,
        totalPages: 0,
        total: 0,
    });

    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleEdit = (data) => {
        setIsFormModel(true);
        setFormdata((prev) => ({
            ...prev,
            name: data?.name,
            email: data?.email,
            password: data?.password,
            phone: data?.phone
        }))
        setUserId(data?.id)
    }

    const handleDelete = (data) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${data.name}?`
        );

        if (confirmDelete) {
            deleteUserMutate(data.id);
        }
    };

    const col = [
        {
            header: "NAME",
            accessorKey: "name",
        },
        {
            header: "EMAIL",
            accessorKey: "email",
        },
        {
            header: "PASSWORD",
            accessorKey: "password",
            cell: ({ row }) => (
                <p>{row?.original?.password || "-"}</p>
            )
        },
        {
            header: "PHONE",
            accessorKey: "phone",
            cell: ({ row }) => (
                <p>{row?.original?.phone || "-"}</p>
            )
        },
        {
            header: "ACTIONS",
            enableColumnFilter: false,
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

    const addUser = async (data) => {
        try {
            // UPDATE
            if (userId) {
                const response = await api.put(`/users/update/${userId}`, data);
                return response.data;
            }

            // ADD
            const response = await api.post("/users/store", data);
            return response.data;

        } catch (error) {
            console.log("Error saving user:", error?.response || error);
            throw error;
        }
    };


    const { mutate: addUsersMutate, isPending } = useMutation({
        mutationFn: addUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
            setIsFormModel(false);
            setUserId("");

            setFormdata({
                name: "",
                email: "",
                password: "",
                phone: ""
            });
        },
        onError: (error) => {
            console.log("Error adding product:", error?.response);
        },
    });

    const formSubmit = (formdata) => {
        addUsersMutate(formdata);
    };

    const getUsers = async () => {
        try {
            const response = await api.post("/users/get-all", {
                page: paginationData.pageIndex,
                size: paginationData.pageSize,
            });
            return response.data;
        } catch (error) {
            console.log("Error:", error.response || error);
            throw error;
        }
    }
    const deleteUser = async (id) => {
        const response = await api.delete(`/users/delete/${id}`);
        return response.data;
    };

    const { mutate: deleteUserMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },

        onError: (error) => {
            console.log("Delete error:", error?.response || error);
        }
    });
    const { data, error, isError, isLoading, isSuccess, } = useQuery({ queryKey: ["user"], queryFn: getUsers });

    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex justify-between'>
                <div className='text-black flex flex-col'>
                    <span className='text-[25px] font-bold'>Users</span>
                    <span className='text-[15px] text-slate-900'>Manage the all Users records</span>
                </div>

                <div>
                    <button className='bg-loginBg p-3 rounded-2xl text-white' onClick={() => setIsFormModel(true)}>+Add User</button>
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
            </div>
            {
                (
                    <Modal
                        title="Add Users"
                        isOpen={isFormModel}
                        actionButton="Add Users"
                        onClose={() => setIsFormModel(false)}
                        onAction={() => formSubmit(formdata)}
                    >
                        <UserForm formdata={formdata} setFormdata={setFormdata} />
                    </Modal>
                )

            }
        </div>
    )
}

export default User