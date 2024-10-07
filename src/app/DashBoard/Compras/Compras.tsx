"use client";
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useAuth } from "@/app/Context/Contexto";
import { getAllOrders } from "@/components/Fetching/FetchingOrders";
import useCarrito from "@/components/Hooks/useCarrito";
import Link from "next/link";
import Swal from 'sweetalert2'


export const Compras: React.FC = () => {
const { userData } = useAuth();



  const {
    cart,
    setCart,
    removeCart,
    lessQuantity,
    moreQuantity,
    clearCart,
    isEmpty,
    totalCart,
  } = useCarrito();

  const handleContinuar = async () => {
    if(cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Alto...",
        text: "Aun no realizaste la compra!",
        
      });
      return;
    }
    try{
      const orders = new Set(cart.map((product) => product.id));
      await getAllOrders(Array.from(orders), userData?.token!);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Su compra ha sido exitosa",
        showConfirmButton: false,
        timer: 1500
      });
      setCart([]);
      localStorage.setItem("cart", JSON.stringify("[]"));
    }catch (error){
        console.error("La compra no puedo realizarse", error)
    }
    }

  return (
    <div className="max-w-[60vw] m-auto">
      <div className="bg-white p-3 rounded-md shadow-md">
        {isEmpty ? (
          <p className="text-center text-2xl text-gray-700">
            Aún no realizaste ninguna compra
          </p>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2">Imagen</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Precio</th>
                  <th className="py-2">Cantidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 text-center">
                      <img
                        className="w-16 h-16 z-50"
                        src={item.image}
                        alt={item.image}
                        width={300}
                        height={150}
                      />
                    </td>
                    <td className="py-2 px-4 text-center">{item.name}</td>
                    <td className="py-2 px-4 text-center">${item.price}</td>
                    <td className="py-2 px-4 text-center flex justify-center">
                      <button
                        onClick={() => lessQuantity(item.id)}
                        type="button"
                        className="btn btn-dark mr-2 bg-gray-200 rounded-full w-5"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => moreQuantity(item.id)}
                        type="button"
                        className="btn btn-dark ml-2 bg-gray-200 rounded-full w-5"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => removeCart(item.id)}
                        className="btn btn-danger bg-red-400 rounded-full"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-end text-2xl">
              Total pagar: <span className="fw-bold">${totalCart}</span>
            </p>
          </>
        )}

        <div className="flex flex-row justify-between w-auto">
          <button
            onClick={clearCart}
            className="btn btn-dark w-40 mt-3 p-2 bg-red-500 rounded-2xl hover:bg-white disabled:hover:bg-gray-100 mx-4"
          >
            Vaciar Carrito
          </button>
          <button
            className="btn btn-dark w-40 mt-3 p-2 bg-blue-500 rounded-2xl hover:bg-white  mx-4"
            onClick={handleContinuar}
          >
            Comprar
          </button>
        </div>
       
      </div>
      <div><p className='text-center text-2xl m-5'>Formas de pago</p>
          <img src="/formas-de-pago.png" alt="formas de pago" />
      </div>
      <Link href="/" className="flex justify-end mr-96 m-5">
        <ArrowUturnLeftIcon className="w-10 h-10 m-3" /> <p className=" m-4 text-2xl">Menu principal</p>
      </Link>
    </div>
  );
};

export default Compras;
