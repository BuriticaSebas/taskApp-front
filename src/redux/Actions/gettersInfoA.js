import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getTasks = createAsyncThunk('getter/getTasks', async ()=>{
    const token = localStorage.getItem('token'); 
    const response = await axios.get('https://tasksapp-jala-back.onrender.com/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data.data;
})


const getCategories = createAsyncThunk('getter/getCategories', async ()=>{


    const token = localStorage.getItem('token'); 
    const response = await axios.get('https://tasksapp-jala-back.onrender.com/api/category', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data.data;
})


export {getTasks, getCategories}

