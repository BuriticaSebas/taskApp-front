import { configureStore } from "@reduxjs/toolkit";
import gettersReducer from "./Reducers/gettersInfoR";
import updateReducerTask from "./Reducers/tasks/updateInterfaceR";
import updateReducerCategories from "./Reducers/categories/CRUDcategoriesR";

const store = configureStore({
    reducer:{
        getter: gettersReducer,
        updatetask : updateReducerTask,
        CrudCategories: updateReducerCategories
    }
})


export default store
