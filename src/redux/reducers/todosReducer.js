import { createSlice } from "@reduxjs/toolkit";

const savedSubject = localStorage.getItem('subjects'); // subjectni olish
const savedTasks = localStorage.getItem('tasks'); // tasksni olish

const initialSubject = savedSubject || ''; // agar null bo'lsa bo'sh stringga o'zgartiramiz
const initialTasks = savedTasks ? JSON.parse(savedTasks) : []; // tasksni to'g'ri o'qish

const initialState = {
    tasks: initialTasks,
    subjects: initialSubject,  // subjectni boshlang'ich holatda saqlash
};


const todosSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
        addNewTask: (state, action) => {
            state.tasks.unshift({title: action.payload, completed: false});
        },
        addSubject: (state, action) => {
            state.subjects = [action.payload];;
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

export const { addNewTask, addSubject, removeTask, completedMark, incompletedMark, editTask } = todosSlice.actions;
export default todosSlice.reducer;