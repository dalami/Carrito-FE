import { ICard } from "./ICard";

export interface IOrders {
    id:number,
    status: string;
    date: string;
    user: string,
   products: ICard[]
    
   }