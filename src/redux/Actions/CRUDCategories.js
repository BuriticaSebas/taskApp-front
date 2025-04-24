import {createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createCategoriesA = createAsyncThunk("Categories/createCategories", async ({ name, userId }) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(
      'https://tasksapp-jala-back.onrender.com/api/category',
      { name, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Dio error la peticion", error);
    throw error;
  }
});


const updateCategoriesA = createAsyncThunk("Categories/updateCategories", async ({idCategory,newName})=>{
   try {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
        `https://tasksapp-jala-back.onrender.com/api/category/${idCategory}`,{name:newName
        },
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


const deleteCategoriesA = createAsyncThunk("Categories/deleteCategories", async (id) => {
  try {
    const token = localStorage.getItem('token'); 

  const response = await axios.delete(
    `https://tasksapp-jala-back.onrender.com/api/category/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.message;
  } catch (error) {
    console.log(error.response)
    alert(error.response.data.message)
  }
});





export {createCategoriesA, updateCategoriesA, deleteCategoriesA}