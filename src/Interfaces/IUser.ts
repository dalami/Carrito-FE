export interface IUser {
    name: string;
    email: string;
    address: string;
    phone: string;
    orders: any[]; 
    password: string;
  }

  export interface IUserErrors {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
  }