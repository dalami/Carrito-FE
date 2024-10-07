
import { ICard } from "@/Interfaces/ICard";
import React from "react";

export const Card: React.FC<ICard & { addToCart: (data: ICard) => void }> = ({
  id,
  name,
  price,
  description,
  image,
  categoryId,
  stock,
  quantity,
  addToCart,
}) => {
  return (
    <div className="border p-4 border-black rounded-xl hover:scale-105 cursor-pointer ">
      <h2 className="text-black text-center text-2xl">{name}</h2>
      <h1 className="text-black text-center m-2"> ${price} </h1>
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover mb-4 rounded-3xl"
      />
      <div className="flex justify-center">
        <button
         
          className="bg-blue-300 rounded-lg h-10 w-40 text-center p-2 " 
          onClick={() =>
            addToCart({
              id,
              name,
              price,
              description,
              image,
              categoryId,
              stock,
              quantity: 1,
            })
          }
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Card;
