import { createSlice } from "@reduxjs/toolkit";

// initial state with an empty tasks array
const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []  //each task will have {title: 'title', completed: false}
};

// reducer function
// const todosReducer = (state = initialState, action) => {
//     let tasks;

//     switch(action.type){
//         case 'ADD_NEW_TASK':
//             return {
//                 ...state, 
//                 tasks: [...state.tasks, {title: action.payload, completed: false}]
//             };

//         case 'REMOVE_TASK':
//             tasks = [...state.tasks];  // create array copy
//             tasks.splice(action.payload, 1);  // deletes one element at index action.payload in the tasks array
            
//             return {...state, tasks};

//         case 'COMPLETED_MARK':
//             tasks = [...state.tasks];  // create array copy
//             tasks[action.payload].completed = true;;  // change by index

//             return { ...state, tasks };
        
//         case 'INCOMPLETED_MARK':
//             tasks = [...state.tasks];  // create array copy
//             tasks[action.payload].completed = false;  // change by index

//             return{...state, tasks};

//         case 'EDIT_TASK': 
//             tasks = [...state.tasks];  // create array copy
//             tasks[action.payload.index].title = action.payload.title;  // change by index

//             return{...state, tasks};
        
//         default: 
//             return state;
//     }
// };

const todosSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
        addNewTask: (state, action) => {
            state.tasks.push({title: action.payload, completed: false});
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