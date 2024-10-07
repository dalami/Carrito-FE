import { useAuth } from "@/app/Context/Contexto";
import { ICard } from "@/Interfaces/ICard";
import { useMemo } from "react";
import Swal from "sweetalert2";

const useCarrito = () => {
  const { userData, cart, setCart } = useAuth();

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  function addToCart(data: ICard) {
    if (!userData) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes estar registrado para agregar productos al carrito",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const itemExists = cart.some((cartItem) => cartItem.id === data.id);

    if (itemExists) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "El producto ya está en el carrito",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      data.quantity = 1;
      setCart([...cart, data]);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El producto fue agregado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function removeCart(id: number) {
    setCart((prevCart) => prevCart.filter((cardItem) => cardItem.id !== id));
  }

  function lessQuantity(id: number) {
    const updateQuantity = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateQuantity);
  }

  function moreQuantity(id: number) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const totalCart = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return {
    cart,
    setCart,
    addToCart,
    removeCart,
    lessQuantity,
    moreQuantity,
    clearCart,
    isEmpty,
    totalCart,
  };
};

export default useCarrito;
