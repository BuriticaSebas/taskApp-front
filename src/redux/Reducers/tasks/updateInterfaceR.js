import { createReducer } from "@reduxjs/toolkit";
import { statusSoli } from "../gettersInfoR";
import { createTaskA, updateTaskA, deletetaskA } from "../../Actions/CrudTasks";
import resetStatus from "../../Actions/resetStatus.js";

const initialState = {
  status: statusSoli.IDLE,
  error: null,
};

const updateReducerTask = createReducer(initialState, (builder) => {
  builder
    // CREATE TASK
    .addCase(createTaskA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(createTaskA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })
    .addCase(createTaskA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      state.error = action.error.message;
    })

    // UPDATE TASK
    .addCase(updateTaskA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(updateTaskA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })
    .addCase(updateTaskA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      state.error = action.error.message;
    })

    // DELETE TASK
    .addCase(deletetaskA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(deletetaskA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })
    .addCase(deletetaskA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      state.error = action.error.message;
    })

    .addCase(resetStatus, (state) =>{
      state.status = statusSoli.IDLE
      state.error = null
    });
});

export default updateReducerTask;
