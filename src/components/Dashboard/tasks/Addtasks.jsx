import {React }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createTaskA } from "../../../redux/Actions/CrudTasks";

const Addtasks = () => {
  const { categories } = useSelector((state) => state.getter);
  const infoCategories = categories.info;

  const dispatch = useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    dispatch(createTaskA({title: data.title, priority: data.priority, categoryId: data.categoryId}))
  };

  


  return (
    <div className="mb-3 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-12 gap-2 sm:grid-cols-12 lg:grid-cols-20"
      >
        <input
          {...register("title", {
            required: "The description is obligatory",
          })}
          type="text"
          placeholder="Hacer la cena"
          className="col-span-full sm:col-span-3 lg:col-span-6 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
        />

        <select
          {...register("categoryId", { required: "La categoría es obligatoria" })}
          className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 col-span-5 sm:col-span-3 text-[12px] sm:text-base lg:col-span-5"
        >
          <option value="">Selecciona categoría</option>
          {infoCategories.map((categoria) => (
            <option value={categoria._id} key={categoria._id}>
              {categoria.name}
            </option>
          ))}
        </select>

        <select
          {...register("priority", { required: "La prioridad es obligatoria" })}
          className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 col-span-5 sm:col-span-3 text-[12px] sm:text-base lg:col-span-5"
        >
          <option value="">Prioridad</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          type="submit"
          className="col-span-full sm:col-span-2 lg:col-span-3 p-3 bg-black text-white font-semibold rounded-xl"
        >
          Añadir Tarea
        </button>
      </form>
    </div>
  );
};

export default Addtasks;
