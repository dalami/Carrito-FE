import { IOrders } from "@/Interfaces/IOrders";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (
  products: number[],
  token: string
): Promise<IOrders[]> => {
  try {
    const response = await fetch(`${apiUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ products }),
    });

    const data: IOrders[] = await response.json();
   

    return data;
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
    throw error;
  }
};

export const getUserOrders = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/users/orders`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log("Soy la data", data);
    return data;
  } catch (error) {
    console.error("Error al obtener todas las órdenes del usuario:", error);
    throw error;
  }
};
