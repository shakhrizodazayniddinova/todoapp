import { createSlice } from "@reduxjs/toolkit";

// initial state with an empty tasks array
const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []  //each task will have {title: 'title', completed: false}
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
        addNewTask: (state, action) => {
            state.tasks.unshift({title: action.payload, completed: false});
        },
        removeTask: (state, action) => {
            state.tasks.splice(action.payload, 1);
        },
        completedMark: (state, action) => {
            state.tasks[action.payload].completed = true;
        },
        incompletedMark: (state, action) => {
            state.tasks[action.payload].completed = false;
        },
        editTask: (state, action) => {
            const {index, title} = action.payload;
            state.tasks[index].title = title;
        }
    }
})

export const { addNewTask, removeTask, completedMark, incompletedMark, editTask } = todosSlice.actions;
export default todosSlice.reducer;