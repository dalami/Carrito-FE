'use client'
import Link from "next/link";
import React from "react";
import { useAuth } from "../Context/Contexto";


export default function DashBoardLayout({
  
  children,
}: {
  children: React.ReactNode;
})  

{

  const { userData } = useAuth();


  return (
    <>
        <p className="text-5xl m-20 text-center">Bienvenido/a: {userData?.user.name}</p>
      <nav className="flex justify-around m-10">
        <Link className="text-2xl bg-blue-300 w-56 rounded-lg text-center  hover:bg-blue-100 text-gray-600" href="/DashBoard/User">Datos del usuario</Link>
        {userData ? (
                    <Link className="text-2xl bg-blue-300 w-56 rounded-lg text-center hover:bg-blue-100 text-gray-600" href="/DashBoard/Compras">
                        Compras
                    </Link>
                ) : (
                    <span className="text-2xl bg-gray-300 w-56 rounded-lg text-center text-gray-600 cursor-not-allowed">
                        Compras
                    </span>
                )}
        
      </nav>
      
      <main>{children}</main>
    </>
  );
}
