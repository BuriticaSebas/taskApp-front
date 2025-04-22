import { createReducer } from "@reduxjs/toolkit"
import { getCategories, getTasks } from "../Actions/gettersInfoA"


export const statusSoli = {
    IDLE: "idle",
    PENDING: "pending",
    SUCCEDED: "succeded",
    FAILED: "failed",
};


const initialState = {
    categories: {
        info: [],
        status: statusSoli.IDLE
    },

    tasks: {
        info: [],
        status: statusSoli.IDLE
    }

}


const gettersReducer = createReducer(initialState, (builder) =>{

    builder
    // CATEGORIES
    .addCase(getCategories.pending, (state) => {
      state.categories.status = statusSoli.LOADING;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.categories.info = action.payload;
      state.categories.status = statusSoli.SUCCEDED;
    })
    .addCase(getCategories.rejected, (state) => {
      state.categories.status = statusSoli.FAILED;
    })

    // TASKS
    .addCase(getTasks.pending, (state) => {
      state.tasks.status = statusSoli.LOADING;
    })
    .addCase(getTasks.fulfilled, (state, action) => {
      state.tasks.info = action.payload;
      state.tasks.status = statusSoli.SUCCEDED;
    })
    .addCase(getTasks.rejected, (state) => {
      state.tasks.status = statusSoli.FAILED;
    });
})

export default gettersReducer