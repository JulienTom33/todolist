import React, { useState } from 'react';
import './todolist.css'; 

const TodoList = () => {

  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  /*
    Function to add a task
  */
  const addTask = () => {
    if (taskInput.trim() !== '') {
      if (editingIndex !== null) {
        const updatedTask = [...task];
        updatedTask[editingIndex].text = taskInput;
        setTask(updatedTask);
        setEditingIndex(null);
      } else {
        setTask([...task, { text: taskInput, completed: false }]);
      }
      setTaskInput('');
    }
  };

  /*
    Function to edit a task
  */
  const editTask = (index) => {
    setTaskInput(task[index].text);
    setEditingIndex(index);
  };

  /*
    Function to delete a task
  */
  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  };

  /*
    Function to toggle a task when it's complete.
    On click, change the CSS
  */
  const toggleTaskCompletion = (index) => {
    const updatedTask = [...task];
    updatedTask[index].completed = !updatedTask[index].completed;
    setTask(updatedTask);
  };

  return (
    <div className='todolist'>
      <h1>Todo List</h1>   
      <div className='list'>
        <ul>
        {task.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span
              onClick={() => toggleTaskCompletion(index)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>             
                <button onClick={() => editTask(index)}>Modifier</button> 
                <button onClick={() => deleteTask(index)}>Supprimer</button>                 
                      
          </li>
        ))}
      </ul>  
    </div>           
           
        
      <div className='task_input'>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Entrez une tâche"          
        />
        <button onClick={addTask}>{editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
      </div>
        
    </div>
  );
}

export default TodoList;