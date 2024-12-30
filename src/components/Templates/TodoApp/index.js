import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { faCheck, faPen, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoStyled from "./TodoStyled";
import { addNewTask, addSubject, completedMark, editTask, incompletedMark, removeTask } from "../../../redux/reducers/todosReducer";
import { Slide } from "react-awesome-reveal";

export default function TodoApp() {
    const dispatch = useDispatch();
    const [taskValue, setTaskValue] = useState('');  // task input state
    const [subjectValue, setSubjectValue] = useState('');  // subject input state
    const [editText, setEditText] = useState(null);  
    const [editIndex, setEditIndex] = useState('');  // edit task state
    const [subject, setSubject] = useState('');  // subject state
    const [isSubjectAdded, setIsSubjectAdded] = useState(false);  // check if subject is added
    const tasks = useSelector((state) => state.todos.tasks);  // tasks selector
    const subjects = useSelector((state) => state.todos.subjects);  // tasks selector
    const theme = useSelector(state => state.layout.darkMode);  // dark mode selector

  useEffect(() => {
    // Retrieve saved subject and isSubjectAdded from localStorage on mount
    const savedSubject = localStorage.getItem('subjects');
    const savedIsSubjectAdded = localStorage.getItem('isSubjectAdded');

    if (savedSubject) {
        setSubject(savedSubject);
        setIsSubjectAdded(savedIsSubjectAdded === 'true'); // Convert to boolean
    }

    localStorage.setItem('darkmode', JSON.stringify(theme));  // theme
    localStorage.setItem('tasks', JSON.stringify(tasks));  // tasks
    localStorage.setItem('subjects', subjects);  // subject
    
  }, [tasks, subjects, theme]);

  // add new task function 
  const addNewTaskHandle = () => {
    if(taskValue.trim() === '') return alert('Task cannot be empty.');
    const capitalizedValue = taskValue.charAt(0).toUpperCase() + taskValue.slice(1);
    dispatch(addNewTask(capitalizedValue));
    setTaskValue('');
  };

  // add subject function
  const handleAddSubject = () => {
    if (subjectValue.trim() === '') return alert('Subject cannot be empty.');
    const capitalizedValue = subjectValue.charAt(0).toUpperCase() + subjectValue.slice(1);
    dispatch(addSubject(capitalizedValue));
    setSubject(capitalizedValue);
    setSubjectValue('');

    localStorage.setItem('subjects', JSON.stringify(capitalizedValue));
    localStorage.setItem('isSubjectAdded', 'true');
  };

  // edit subject function
  const handleEditSubject = () => {
    setSubjectValue(subject);
    setIsSubjectAdded(false);
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
            <div className="formsContainer">
                <div className="formDiv">
                    {/* topic input */}
                    {isSubjectAdded ? (
                        <div className="subjectDisplay">
                            <span className="subjectText">{subject}</span>
                            <button className="editBtn btn p-1 px-2" onClick={handleEditSubject}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>
                    ) : (
                        <>
                        <input
                            className="subjectInput ps-3"
                            type="text"
                            value={subjectValue}
                            onChange={(e) => setSubjectValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                            placeholder="Please enter a subject"
                        />
                        <button className="addBtn btn p-1 px-2" onClick={handleAddSubject}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        </>
                    )}
                </div>

                <div className="formDiv">
                    {/* task input */}
                    <input className="todoInput ps-3" 
                        type="text" 
                        value={taskValue} 
                        onChange={(e) => setTaskValue(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && addNewTaskHandle()}
                        placeholder="Add new task"/>

                    {/* add button */}
                    <button className="addBtn btn p-1 px-2" onClick={addNewTaskHandle}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
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
