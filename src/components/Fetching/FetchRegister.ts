import { IUser } from "@/Interfaces/IUser";
import Swal from "sweetalert2";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegister = async (UserData: IUser) => {
  try {
    const register = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });

    if (!register.ok) {
      throw new Error("Error en el registro");
    }
    const response = await register.json();
    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",

      text: "Usuario ya registrado!",
    });
    throw error;
  }
};
