
'use client'

import { useAuth } from "@/app/Context/Contexto";
import { getUserOrders } from "@/components/Fetching/FetchingOrders";
import { IOrders } from "@/Interfaces/IOrders";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const User : React.FC = () => {
  const {userData,setUserData} = useAuth()
  console.log("Soy userData",userData);
  
  const [ordenes, setOrdenes] = useState<IOrders[]>([]);
  console.log("soy la orden",ordenes);
  
 
  const fetchUserOrders = async () => {
    if (userData?.token) {
      try {
        const ordersUser = await getUserOrders(userData.token);
        setOrdenes(ordersUser);
      } catch (error) {
        console.error("Error al obtener las órdenes del usuario:", error);
      }
    } else {
      console.error("Token no encontrado");
    }
  };

   useEffect(() => {
    fetchUserOrders(); 
  },[]);

  return (
    <div className="text-center m-10">
      <h2 className="text-2xl m-5">Nombre: {userData?.user.name}</h2>
      <h3 className="text-2xl m-5">Email: {userData?.user.email}</h3>
      <h3 className="text-2xl m-5">Direccion: {userData?.user.address}</h3>
      <h3 className="text-2xl m-5">Telefono: {userData?.user.phone}</h3>
      <div className="flex flex-col gap-4">
            {ordenes?.length > 0 ? (
              ordenes.map((orden) => {
                return (
                  <div className="max-w-[60vw] m-auto" key={orden.id}>
                    <div className="m-5 text-center">
                      <p className="m-2">Status:  {orden.status}</p>
                      <p>Fecha: {new Date(orden.date).toLocaleDateString('es-ES')}</p> 
                      <div>
                        <ul>
                          {orden.products.map((prod) => (
                            <li key={prod.id} className=" border p-2 mb-2">
                              <p className="m-1" >Nombre: {prod.name}</p>
                              <p className="m-2">Precio: ${prod.price}</p>
                              <img
                                className="mx-auto "
                                src={prod.image}
                                alt={prod.name}
                                width={100}
                                height={100}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p>Usted no tiene ninguna orden</p>
              </div>
            )}
          </div>
          <Link href="/" className="flex justify-end mr-96 m-5">
        <ArrowUturnLeftIcon className="w-10 h-10 m-3" /> <p className=" m-4 text-2xl">Menu principal</p>
      </Link> 
    </div>
  );
};

export default User;
