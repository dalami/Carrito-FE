export interface ICar {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
    stock: number;
    
  }

  export interface ICard extends ICar {
    quantity : number
  }