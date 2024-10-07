import { ICard } from "@/Interfaces/ICard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchDataP = async (): Promise<ICard[]> => {
    try {
      const products = await fetch(`${apiUrl}/products`, {
        next: { revalidate: 1200 },
      });
      if (!products.ok) {
        throw new Error("Error en el registro");
      }
      const res = await products.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  export const fetchDataPbyId = async (id : string): Promise<ICard> => {
    try {
      const products : ICard[] = await fetchDataP()
      const productsFilt = products.find((product) => product.id.toString() === id)
      
      if(!productsFilt) throw new Error("Producto no encontrado")

        return productsFilt
    } catch (error) {
      throw error;
    }
  };

