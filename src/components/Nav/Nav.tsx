"use client";
import { useEffect, useState } from "react";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/app/Context/Contexto";
import { useRouter } from "next/navigation";
import { ICard } from "@/Interfaces/ICard";

export const Nav: React.FC = () => {
  const Router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { userData, setUserData, cards } = useAuth();
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [filtro, setFiltro] = useState<ICard[]>(cards);

  useEffect(() => {
    const token = localStorage.getItem("userToken") || userData?.token;
    console.log("Token:", token);
    console.log("UserData:", userData);
    if (token && userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  useEffect(() => {
    if (buscar) {
      const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(buscar.toLowerCase())
      );
      setFiltro(filteredCards);
    } else {
      setFiltro(cards);
    }
  }, [buscar, cards]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem("userSession");
    setUserData(null);
    setIsLogin(false);
    // Router.push("/api/auth/logout");
  };

  const prodFiltrados = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscar(event.target.value);
  };

  const borrar = () => {
    setBuscar("");
  };

  return (
    <div className="flex flex-row items-center justify-around bg-slate-300 h-36">
      <Link href="/">
        <img className="w-48" src="/logo.png" alt="Logo" />
      </Link>

      <input
        value={buscar}
        onChange={prodFiltrados}
        className="rounded-full w-80 h-11 px-4"
        placeholder="Buscar..."
        onClick={()=>{setBuscar("")}}
      />
      {buscar && (
        <button onClick={borrar} className="absolute right-1/3 text-gray-500">
          X
        </button>
        
      )}

      <div className="flex flex-row">
        {!isLogin ? (
          <>
            <button onClick={toggleMenu}>
              <UserCircleIcon className="w-10 h-10" />
            </button>
            {menuOpen && (
              <div className="absolute p-4 bg-white border border-gray-300 rounded-md shadow-lg top-16 right-16">
                <ul>
                  <li>
                    <Link
                      href="/Login"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Register"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Registrarse
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link href="./">
            <button onClick={logoutUser} className="text-2xl m-1">
              Cerrar
            </button>
          </Link>
        )}

        {isLogin && (
          <Link href="/DashBoard/Compras">
            <button>
              <ShoppingCartIcon className="w-10 h-10" />
            </button>
          </Link>
        )}
      </div>
      {showCartMessage && (
        <div className="absolute bg-red-500 text-white p-2 rounded-md top-24 right-10">
          Debes estar registrado para acceder al carrito.
        </div>
      )}
      {isLogin && <p className="text-2xl  ">{userData?.user.name}</p>}
      {buscar && (
        <div className="absolute bg-white shadow-md rounded-md p-4">
          {filtro.length > 0 ? (
            filtro.map((card) => (
              <Link
                key={card.id}
                href={`/products/${card.id}`}
                className="block"
                onClick={() => setBuscar("")}
              >
                {card.name}
              </Link>
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
