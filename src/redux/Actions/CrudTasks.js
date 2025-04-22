import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createTaskA = createAsyncThunk("tasks/createtask", async ({title, priority, categoryId})=>{
    try {
      const token = localStorage.getItem('token'); 
    const response = await axios.post(
        'http://localhost:4000/api/tasks',

        {
        title,
        priority,
        categoryId
        }
        ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    return response.data.data
    } catch (error) {
      console.log(error)
    }
})


const updateTaskA = createAsyncThunk("tasks/updatetask", async ({id,data})=>{
   try {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
        `http://localhost:4000/api/tasks/${id}`,data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });


    return response.data.data
   } catch (error) {
    console.log(error)
   }
})


const deletetaskA = createAsyncThunk("tasks/deletetask", async (id) => {
  const token = localStorage.getItem('token'); 

  const response = await axios.delete(
    `http://localhost:4000/api/tasks/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.message;
});


export {createTaskA, updateTaskA, deletetaskA}