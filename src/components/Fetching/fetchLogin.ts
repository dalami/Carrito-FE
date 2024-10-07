import { ILogin } from "@/Interfaces/ILogin";
import Swal from "sweetalert2";
const apiUrl = process.env.NEXT_PUBLIC_API_URL


export const fetchLogin = async (UserLogin: ILogin) => {
    try {
      const logueo = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserLogin),
      });
  
      const logueoOk = await logueo.json();
      console.log("me loguee correctamente", logueoOk);
  
      return logueoOk;
    } catch (error) {
      Swal.fire({
        icon: "error",
  
        text: "Error en el registro!",
      });
      throw error;
    }
  };