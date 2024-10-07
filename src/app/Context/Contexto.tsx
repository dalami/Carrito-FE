"use client";

import { fetchDataP } from "@/components/Fetching/fetchData";
import { ICard } from "@/Interfaces/ICard";
import { AuthContextProps, IUserSession } from "@/Interfaces/IUserSession";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactElement;
}

const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  cart: [],
  setCart: () => [],
  cards: [],
  setCards: () => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [cart, setCart] = useState<ICard[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await fetchDataP(); 
        setCards(fetchedCards); 
      } catch (error) {
        console.error("Error al obtener las cards:", error);
      }
    };

    fetchCards();
  }, []);
  
  useEffect(() => {
    const storedUserData = localStorage.getItem("UserSession");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

 
  useEffect(() => {
    if (userData) {
      localStorage.setItem("UserSession", JSON.stringify(userData));
    } else {
      localStorage.removeItem("UserSession");
    }
  }, [userData]);

 
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart); 
        } else {
          throw new Error("Cart no es un array");
        }
      } catch (error) {
        console.error("Error cargando cart desde localStorage:", error);
        setCart([]); 
      }
    }
  }, []);

  
  useEffect(() => {
    if (Array.isArray(cart) && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <AuthContext.Provider value={{ cart, setCart, userData, setUserData, cards , setCards }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
