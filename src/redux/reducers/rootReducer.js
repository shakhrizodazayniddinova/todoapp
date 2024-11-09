import layoutReducer from "./layout";
import todosReducer from "./todosReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        todos: todosReducer,
    }
});

export default store;