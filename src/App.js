import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [taskItems, setTaskItem] = useState([]);
  const [task, setTask] = useState('');
  const inputRef = useRef('');

  const handleSave = (task) => {

    if (!inputRef.current) { // new
      if (!taskItems.find(taskItem => taskItem.name === task))
        if (task){
          setTaskItem([...taskItems, { id: uuidv4(), name: task }])
        }else{
          alert('Error, ingrese una tarea!!!')
        }
    } else { // edit
      if (task) {
        const newTasks = taskItems.map(taskItem => {
          if (taskItem.id === inputRef.current) {
            return {...taskItem, name: task};
          }
          return taskItem;
        });
  
        setTaskItem(newTasks);
        inputRef.current = '';
      }else{
        alert('Error, ingrese una tarea!!!')
      }
      
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
    if (data) setTaskItem(JSON.parse(data));
    
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems])
  
  
  return (
    <main className="bg-dark vh-100 text-white">
      <div className='container text-center col-md-4 pt-5'>
     
        <h2 className='my-2'>Task list</h2>
        {
          inputRef.current
            ?
            <h3>Edit task</h3>
            :
            <h3>Create task</h3>
        }
        <TaskForm
          handleSave={handleSave}
          task={task}
          setTask={setTask}
        />
        <h4>
          TASK
        </h4>
        <TaskList
          taskItems={taskItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;
