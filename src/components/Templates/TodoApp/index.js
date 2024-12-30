import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { faCheck, faPen, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoStyled from "./TodoStyled";
import { addNewTask, completedMark, editTask, incompletedMark, removeTask } from "../../../redux/reducers/todosReducer";
import { Slide } from "react-awesome-reveal";

export default function TodoApp() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');  // values state
  const tasks = useSelector((state) => state.todos.tasks);  // tasks selector
  const theme = useSelector(state => state.layout.darkMode);  // dark mode selector

  // edit task
  const [editText, setEditText] = useState(null);  
  const [editIndex, setEditIndex] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));  // tasks
    localStorage.setItem('darkmode', JSON.stringify(theme));  // theme
  }, [tasks, theme]);

  // add new task function 
  const addNewTaskHandle = () => {
    if(value.trim() === '') return alert('Task cannot be empty.');
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    dispatch(addNewTask(capitalizedValue));
    setValue('');
  };

  // remove task function
  const handleRemoveTask = (index) => dispatch(removeTask(index));  // remove task

  // toggle completed status function
  const toggleComplete = (index) => dispatch(completedMark(index));

  // toggle incompleted status function
  const toggleIncomplete = (index) => dispatch(incompletedMark(index));

  // edit task function
  const startEditTask = (task, index) => {
    setEditIndex(index);
    setEditText(task.title);
  }

  // save edit task function
  const saveEditTask = () => {
    dispatch(editTask({ index: editIndex, title: editText }));
    setEditIndex('');
    setEditText(null);
  }

  return (
    <TodoStyled theme={theme}>
        <div className="container">
            <div className="formDiv">
                {/* task input */}
                <input className="todoInput ps-3" 
                    type="text" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && addNewTaskHandle()}
                    // onFocus={}
                    placeholder="Add new task"/>

                {/* add button */}
                <button className="addBtn btn p-1 px-2" onClick={addNewTaskHandle}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>

            <div>
                {/* tasks length */}
                <p className="todoLength">Tasks to do - {tasks.length > 0 ? tasks.length : 0}</p>

                <div className="tasks"> 
                    <ListGroup className="todoList">
                        {/* tasks list */}
                        {tasks.map((task, index) => (
                            <Slide direction="down" duration={500} style={{width: '100%'}}>
                                <ListGroup.Item key={index} className="todo" onDoubleClick={() => toggleComplete(index)}
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none', // line-through if completed
                                    }}>
                                    
                                    {/* edit task input */}
                                    {editIndex === index ? (
                                        <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    ) : (
                                        // Display task title
                                        <span onDoubleClick={() => toggleComplete(index)}>
                                            {task.title}
                                        </span>
                                    )}
                                    
                                    <div className="tasksBtn">
                                        {/* completed button */}
                                        <button onClick={() => (task.completed ? toggleIncomplete(index) : toggleComplete(index))}>
                                            <FontAwesomeIcon icon={task.completed ? faXmark : faCheck} />
                                        </button>

                                        {/* edit button */}
                                        <button onClick={() => editIndex === index ? saveEditTask() : startEditTask(task, index)}>
                                            <FontAwesomeIcon icon={editIndex === index ? faCheck : faPen}/>
                                        </button>

                                        {/* remove task button */}
                                        <button onClick={() => handleRemoveTask(index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </ListGroup.Item>
                            </Slide>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    </TodoStyled>
  ) 
}
