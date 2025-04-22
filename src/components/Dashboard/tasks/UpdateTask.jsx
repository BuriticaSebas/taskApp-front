import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateTaskA } from "../../../redux/Actions/CrudTasks";
import { statusSoli } from "../../../redux/Reducers/gettersInfoR.js";
import resetStatus from "../../../redux/Actions/resetStatus.js";

const UpdateTask = ({ modalUpdate, CloseUpdate, idTask }) => {
  if (!modalUpdate) return null;

  const { categories} = useSelector((state) => state.getter);
    const {status} = useSelector((state)=> state.updatetask)
  
  
  const infoCategories = categories.info;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = (data) => {
  dispatch(
    updateTaskA({
      id: idTask,
      data: data, 
    })
  );
};


    useEffect(() => {
      if (status === statusSoli.SUCCEDED) {
        CloseUpdate();
    
        setTimeout(() => {
          dispatch(resetStatus()); 
        }, 100); 
      }
    }, [status]);
    


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg w-2/3 sm:w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl text-center font-semibold text-gray-800">
          Update Task
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-3"
        >
          <input
            {...register("title")}
            type="text"
            placeholder="Hacer la cena"
            className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
          />

          <select
            {...register("categoryId")}
            className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700"
          >
            <option value="">Selecciona categoría</option>
            {infoCategories.map((categoria) => (
              <option value={categoria._id} key={categoria._id}>
                {categoria.name}
              </option>
            ))}
          </select>

          <select
            {...register("priority")}
            className="p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700"
          >
            <option value="">Prioridad</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={CloseUpdate}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-300 text-white font-medium rounded-md transition duration-200"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black hover:bg-gray-700 text-white font-medium rounded-md transition duration-200"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
