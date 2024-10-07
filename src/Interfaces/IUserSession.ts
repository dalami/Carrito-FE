import { ICard } from "./ICard";


export interface IUserSession {
    token: string;
    user: {
      address: string;
      email: string;
      id: number;
      name: string;
      phone: string;
      orders: [];
      role: string;
    };
  }


  export interface AuthContextProps {
    userData: IUserSession | null;
    setUserData: React.Dispatch<React.SetStateAction<IUserSession | null>>;
    cart: ICard[];
  setCart: React.Dispatch<React.SetStateAction<ICard[]>>;
  cards:ICard[],
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  
  }
  

