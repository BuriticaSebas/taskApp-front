import {React, useEffect }from "react";
import { updateCategoriesA } from "../../../redux/Actions/CRUDCategories.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import resetStatus from "../../../redux/Actions/resetStatus.js";
import { statusSoli } from "../../../redux/Reducers/gettersInfoR.js";

const UpdateModalCategory = ({ modalUpdate, closeUpdate, idCategory}) => {
  if (!modalUpdate) return null;

    const {status} = useSelector((state)=> state.CrudCategories)
  

  const dispatch = useDispatch()

   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    
    
    const onSubmit = (name) => {
      const newName = name.name
      console.log(idCategory)
     dispatch(updateCategoriesA({ idCategory: idCategory , newName: newName })
    );
    };

    useEffect(() => {
      if (status === statusSoli.SUCCEDED) {
        closeUpdate();
    
        setTimeout(() => {
          dispatch(resetStatus()); 
        }, 100); 
      }
    }, [status]);
  

     

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-center rounded-2xl shadow-lg w-2/3 sm:w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Update Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

        <input
             {...register("name", {
              required: "The name is obligatory",
            })}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej. Compras"
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={closeUpdate}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-300 text-white font-medium rounded-md transition duration-200"
          >
            Cerrar
          </button>
          <button
             type="submit"
            className="mt-4 px-4 py-2  bg-black hover:bg-gray-700 text-white font-medium rounded-md transition duration-200"
          >
            Guardar
          </button>
        </div>
          
        </form>
   
      </div>
    </div>
  );
};

export default UpdateModalCategory;

