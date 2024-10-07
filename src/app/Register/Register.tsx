"use client";
import { fetchRegister } from "@/components/Fetching/FetchRegister";
import { RegisterValidation } from "@/helpers/Validate";
import { IUser, IUserErrors } from "@/Interfaces/IUser";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'

export const Register = () => {
  const Router = useRouter();
  const initialState = {
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    orders:[]
   
  }

  const [register, setRegister] = useState<IUser>(initialState)
  const [ errors, setErrors] = useState<IUserErrors>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target
    setRegister({
      ...register,
      [name] : value
    })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetchRegister(register)
      console.log("Usuario registrado correctamente", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El registro ha sido exitoso",
        showConfirmButton: false,
        timer: 1500
      });
      Router.push("./Login");
      
  } catch (error) {
      console.log("Error al registrarse" , error);
      setRegister(initialState)
   }
  
  }

  useEffect(()=> {
    const errors = RegisterValidation(register)
     setErrors(errors)
  },[register])



  return (
    <>
      <div className="flex justify-center items-center h-screen  max-w-[80vw] m-auto box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
        <form onSubmit={handleSubmit}  className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Formulario de Registro
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              value={register.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500  text-center">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              {}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={register.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500  text-center">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
             { }
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              name="address"
              type="text"
              placeholder="Dirección"
              value={register.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500  text-center">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
             {}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Teléfono"
              value={register.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500  text-center">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              {}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={register.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500  text-center">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-center mt-10">
            <button disabled={errors.email || errors.password ?  true : false}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
