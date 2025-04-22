import { createReducer } from "@reduxjs/toolkit";
import { statusSoli } from "../gettersInfoR";
import { createCategoriesA, updateCategoriesA, deleteCategoriesA } from "../../Actions/CRUDCategories.js";
import resetStatus from "../../Actions/resetStatus.js";

const initialState = {
  status: statusSoli.IDLE,
  error: null,
};

const updateReducerCategories = createReducer(initialState, (builder) => {
  builder
    // CREATE Categories
    .addCase(createCategoriesA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(createCategoriesA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })

    .addCase(createCategoriesA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      
      state.error = action.error.message;
    })


    // UPDATE Categories
    .addCase(updateCategoriesA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(updateCategoriesA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })
    .addCase(updateCategoriesA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      state.error = action.error.message;
    })

    // DELETE Categories
    .addCase(deleteCategoriesA.pending, (state) => {
      state.status = statusSoli.LOADING;
    })
    .addCase(deleteCategoriesA.fulfilled, (state) => {
      state.status = statusSoli.SUCCEDED;
    })
    .addCase(deleteCategoriesA.rejected, (state, action) => {
      state.status = statusSoli.FAILED;
      state.error = action.error.message;
    })

    .addCase(resetStatus, (state) =>{
      state.status = statusSoli.IDLE
      state.error = null
    });
});

export default updateReducerCategories;
