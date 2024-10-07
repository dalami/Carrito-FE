'use client';

import Card from "../Card/Card";
import Link from "next/link";
import useCarrito from "../Hooks/useCarrito";
import { ICard } from "@/Interfaces/ICard";
import { useAuth } from "@/app/Context/Contexto";


const ClientCardList: React.FC = () => {
  const { addToCart } = useCarrito();
  const { cards} = useAuth()

  if (cards.length === 0) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link href={`/products/${card.id}`} key={card.id}>
          <Card {...card} addToCart={addToCart} />
        </Link>
      ))}
    </div>
  );
};

export default ClientCardList;