import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskForm } from './components/TaskForm';

function App() {

  const [taskItems, setTaskItem] = useState([]);
  const [task, setTask] = useState('');
  const inputRef = useRef('');

  const handleSave = (task) => {

    if (!inputRef.current) { // new
      if (!taskItems.find(taskItem => taskItem.name === task))
        setTaskItem([...taskItems, { id: uuidv4(), name: task }])
    } else { // edit
      
      const newTasks = taskItems.map(taskItem => {
        if (taskItem.id === inputRef.current) {
          return {...taskItem, name: task};
        }
        return taskItem;
      });

      setTaskItem(newTasks);
      inputRef.current = '';
      
    }
    setTask('');
  }

  const handleDelete = (id) => {
    const deleteTask = taskItems.filter(taskItem => taskItem.id !== id);
    setTaskItem([...deleteTask]);
  }

  const handleEdit = (task) => {
    setTask(task.name);
    inputRef.current = task.id;
  }

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      setTaskItem(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems])
  
  
  return (
    <div className="App">
      <h2>Lista de tareas</h2>
      {
        inputRef.current ?
          <h3>Editar tarea</h3>
          :
          <h3>Crear tarea</h3>
      }
      <TaskForm handleSave={handleSave} task={task} setTask={setTask}/>
      <h3>
        Task
      </h3>
      <ul>
        {
          taskItems.length > 0 ?
            taskItems.map(task => (
              <li key={task.id}>{task.name} <button onClick={() => handleDelete(task.id)}>Delete</button><button onClick={() => handleEdit(task)}>Edit</button></li>
            ))
          : <h4>sin tareas</h4>
        }
      </ul>
    </div>
  );
}

export default App;
