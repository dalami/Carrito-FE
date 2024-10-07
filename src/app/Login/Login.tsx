
"use client";
import { useAuth } from "@/app/Context/Contexto";
import { fetchLogin } from "@/components/Fetching/fetchLogin";
import { loginValidation } from "@/helpers/Validate";
import { ILogin, ValidLogErrorsProps } from "@/Interfaces/ILogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";

export const Login = () => {
  const Router = useRouter();
  const { setUserData } = useAuth();

  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILogin>(initialState);
  const [errors, setErrors] = useState<ValidLogErrorsProps>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = loginValidation(dataUser);
    setErrors(errors);

    if (!errors.email && !errors.password) {
      try {
        const loguin = await fetchLogin(dataUser);
        if (loguin.login) {
          const userSession = {
            token: loguin.token,
            user: loguin.user,
          };
          setUserData(userSession);
          // localStorage.setItem("UserSession", JSON.stringify(userSession));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario logueado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          Router.push("./");
        } else {
          Swal.fire({
            icon: "error",
            text: "Error de credenciales",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Error al loguearse",
        });
        setDataUser(initialState);
      }
    }
  };

  
  const handleAuth0Login = () => {
    Router.push("/api/auth/login"); 
  };

  useEffect(() => {
    const errors = loginValidation(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <div className="flex justify-center items-center h-screen max-w-[80vw] m-auto box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Formulario de Inicio de Sesión
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="johnDoe@gmail.com"
            value={dataUser.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-center">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={dataUser.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-center">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            type="submit"
            disabled={errors.email || errors.password ? true : false}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
          <span className="text-sm">¿Aún no tienes cuenta?</span>
          <Link href="/Register">
            <button
              className="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Crear cuenta
            </button>
          </Link>
        </div>

        
        {/* <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleAuth0Login}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar 
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
