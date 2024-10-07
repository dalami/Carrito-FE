'use client';
import Link from 'next/link';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { ICard } from '@/Interfaces/ICard';
import React, { useState } from 'react';
import useCarrito from '../Hooks/useCarrito';
import { useAuth } from '@/app/Context/Contexto'; 

export const ProductDetail: React.FC<ICard> = ({
  name,
  price,
  description,
  image,
  categoryId,
  stock,
  quantity,
}) => {
  const { addToCart } = useCarrito();
  const { userData, cart ,setCart} = useAuth(); 
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleAddToCart = () => {
    if (!userData) { 
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
      }, 2000);
      return; 
    }

    addToCart({ id: categoryId, name, price, description, image, categoryId, stock, quantity: 1 });
    
  };

  return (
    <>
      <div className="flex justify-center items-center m-5">
        <div className="border-4 rounded-3xl w-1/4 p-5 text-center">
          <h1 className="text-2xl mb-5">{name}</h1>
          <img src={image} alt={name} className="m-5" />
          <h2 className="text-xl mb-5">{description}</h2>
          <h2 className="text-xl">$ {price}</h2>
          <button
            type="button"
            className="bg-blue-300 rounded-lg h-10 w-40 hover:bg-blue-100 m-4"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

     {showLoginMessage && (
        <div className="flex justify-center mt-4">
          <p className="text-red-600 text-3xl">¡Debes estar registrado para agregar productos al carrito!</p>
        </div>
      )}

      {/* <div className="flex justify-center mt-4">
        <Link href="./login" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-400">
         Login
        </Link>
      </div> */}
      <div className='flex flex-wrap justify-end'>
       
       {userData ? (
           <Link href="/" className="flex justify-end mr-96">
           <ArrowUturnLeftIcon className="w-10 h-10" /><p className=" m-2 text-2xl">Menu Principal</p>
         </Link>
       ): (
        <>
        <Link href="/" className="flex justify-end mr-96">
           <ArrowUturnLeftIcon className="w-10 h-10" /><p className=" m-2 text-2xl">Menu Principal</p>
         </Link>
        <Link href="/Login" className="flex justify-end mr-96">
        <ArrowUturnLeftIcon className="w-10 h-10" /><p className=" m-2 text-2xl">Login</p>
      </Link>
        </>
       )}
       
      {userData ? (

      <Link href="/DashBoard/Compras" className="flex justify-end mr-96">
        <ArrowUturnLeftIcon className="w-10 h-10" /><p className=" m-2 text-2xl">Mis Compras</p>
      </Link>
      ): 
      (
        <p></p>
      )}
      </div>
      
    </>
  );
};

export default ProductDetail;
