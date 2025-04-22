import {React, useEffect }from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deletetaskA } from '../../../redux/Actions/CrudTasks';
import { statusSoli } from "../../../redux/Reducers/gettersInfoR.js";
import resetStatus from "../../../redux/Actions/resetStatus.js";
const DeleteModalTask = ({ modalDelete, closeDelete, idTask }) => {
  if (!modalDelete) return null;

  const dispatch = useDispatch()

  const {status} = useSelector((state)=> state.updatetask)

  console.log("Este es el id", idTask)

  
  useEffect(() => {
    if (status === statusSoli.SUCCEDED) {
      closeDelete();
  
      setTimeout(() => {
        dispatch(resetStatus()); 
      }, 100); 
    }
  }, [status]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-center rounded-2xl shadow-lg w-2/3 sm:w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Delete Task</h2>
        <span>¿Estas seguro de eliminar esta tarea ?</span>
        <div className="flex justify-center gap-3">
          <button
            onClick={closeDelete}
            className="mt-4 px-4 py-2  bg-black hover:bg-gray-700 text-white font-medium rounded-md transition duration-200"
          >
            Cerrar
          </button>
          <button
            onClick={()=> dispatch(deletetaskA(idTask))}
            className="mt-4 px-4 py-2  bg-red-600 hover:bg-red-300 text-white font-medium rounded-md transition duration-200"
          >
           Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalTask;