import { ILogin, ValidLogErrorsProps } from "@/Interfaces/ILogin";
import { IUser, IUserErrors } from "@/Interfaces/IUser";

export function loginValidation(userLogin: ILogin) {
    const errors: ValidLogErrorsProps = {};
  
    if (!userLogin.email) {
      errors.email = "El email es requerido";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userLogin.email)) {
      errors.email = "El email no es válido";
    }
  
    if (!userLogin.password) {
      errors.password = "La contraseña es requerida";

    }
  
    return errors;
  }
  

  export function RegisterValidation(userRegister: IUser) {
    const errors: IUserErrors = {};
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Al menos 6 caracteres, incluyendo letras y números
  
    if (userRegister.name === "") errors.name = "El nombre es requerido";
    if (userRegister.email === "") errors.email = "El email es requerido";
    if (!emailRegex.test(userRegister.email)) errors.email = "El email es incorrecto";
    if (userRegister.address === "") errors.address = "La dirección es requerida";
    if (userRegister.phone === "") errors.phone = "El teléfono es requerido";
    if (userRegister.password === "") errors.password = "La contraseña es requerida";
    if (!passRegex.test(userRegister.password)) 
      errors.password = "Debe contener al menos 6 caracteres, incluyendo una letra y un número";
  
    return errors;
  }
  