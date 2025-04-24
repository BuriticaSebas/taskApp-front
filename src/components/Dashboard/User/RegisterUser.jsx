import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [passwordView, SetPasswordView] = useState(false);

  const alterterView = () => {
    SetPasswordView(!passwordView);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://tasksapp-jala-back.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || "Error en el registro");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center p-5">
      <div className="text-center mb-2">
        <h1 className="font-black text-2xl">TaskApp</h1>
        <p>Organize your tasks efficiently</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-80 bg-white items-center p-5 rounded-lg md:w-100"
      >
        <div className="mb-7">
          <h3 className="font-black text-lg">Welcome Register Now</h3>
          <p className="opacity-50">Register your details to continue</p>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="nombre" className="font-black my-2">
            Nombre
          </label>
          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            type="text"
            placeholder="Sebastian"
            className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="apellido" className="font-black my-2">
            Apellido
          </label>
          <input
            {...register("apellido", {
              required: "El apellido es obligatorio",
            })}
            type="text"
            placeholder="Buritica"
            className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm">{errors.apellido.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="username" className="font-black my-2">
            Username
          </label>
          <input
            {...register("username", {
              required: "El username es obligatorio",
              minLength: {
                value: 4,
                message: "Mínimo 4 caracteres",
              },
            })}
            type="text"
            placeholder="sebas7789"
            className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="correo" className="font-black my-2">
            Correo
          </label>
          <input
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no válido",
              },
            })}
            type="email"
            placeholder="sebas@gmail.com"
            className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
          />
          {errors.correo && (
            <p className="text-red-500 text-sm">{errors.correo.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
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
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:])[A-Za-z\d@$!%*?&:]+$/,
                  message: "Debe tener mayúscula, número y símbolo",
                },
              })}
              type={passwordView ? "text" : "password"}
              className="border-1 border-[rgba(0,0,0,0.3)] rounded-lg px-2 py-1"
            />
            {passwordView ? (
              <button
                type="button"
                onClick={alterterView}
                className="absolute top-2 right-3"
              >
                <IoMdEye />
              </button>
            ) : (
              <button
                type="button"
                onClick={alterterView}
                className="absolute top-2 right-3"
              >
                <IoIosEyeOff />
              </button>
            )}

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
          <p className="opacity-50">Do you already have an account?</p>
          <p className="opacity-50 hover:opacity-100">
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
