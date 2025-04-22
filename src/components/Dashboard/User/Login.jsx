import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();

  const [passwordView, SetPasswordView] = useState(false)

  const alterterView = ()=>{
      SetPasswordView(!passwordView)
  }

  const navigate = useNavigate()

  const login = async (data)=>{
    
    try {

      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });


      const result = await response.json();

      console.log(result)

      if(!response.ok){
        throw new Error(result.msg || "Error en el login");
      }

      localStorage.setItem("token", result.token)
      localStorage.setItem("nameUser", result.nameUser)
      localStorage.setItem("idUser", result.idUser)

      navigate("/dashboard")

      
    } catch (error) {
      console.error("Error",  error.msg)
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center  ">
        <div className="text-center  mb-9">
          <h1 className="font-black  text-2xl">TaskApp</h1>
          <p>Organize your tasks efficiently</p>
        </div>

        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col  w-80  bg-white  items-center p-5  rounded-lg md:w-100"
        >
          <div className="mb-7">
            <h3 className="font-black text-lg">Welcome Back</h3>
            <p className="opacity-50">Enter your details to enter</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="correo" className="font-black my-2">
              Correo
            </label>
            <input
              {...register("correo")}
              type="email"
              className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-black my-2">
              Password
            </label>
            <div className="relative">
            <input
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:])[A-Za-z\d@$!%*?&:]+$/,
                  message: "Debe tener mayúscula, número y símbolo",
                },
              })}
              type= {passwordView ? "text": "password" }
              className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"

            />
            {passwordView ? <button type= "button" onClick={alterterView} className="absolute top-2 right-3"><IoMdEye/></button> : <button type= "button" onClick={alterterView} className="absolute top-2 right-3"><IoIosEyeOff/></button>}
            
            {errors.password && <p>{errors.password.message}</p>}

            </div>
            
          </div>

          <button
            type="submit"
            className="bg-black text-white px-9 py-2 rounded-lg mt-4"
          >
            Submit
          </button>

          <div className="flex flex-col items-center mt-5">
            <p className="opacity-50">Don't have an account?</p>
            <p className="opacity-50 hover:opacity-100">
              <Link to="/register">Register Here</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
