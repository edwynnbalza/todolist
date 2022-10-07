import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskForm } from './components/TaskForm';
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
          alert('Error!!!')
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
        alert('Error!!!')
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
    if (data) {
      setTaskItem(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems])
  
  
  return (
    <main className="bg-dark vh-100 text-white">
      <div className='container text-center col-md-4 pt-5'>
     
        <h2 className='my-2'>Lista de tareas</h2>
        {
          inputRef.current
            ?
            <h3>Editar tarea</h3>
            :
            <h3>Crear tarea</h3>
        }
        <TaskForm handleSave={handleSave} task={task} setTask={setTask}/>
        <h4>
          TASK
        </h4>
        <div className='my-5' style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            {
              taskItems.length > 0 ?
                taskItems.map(task => (
                  <div key={task.id} className="row border-bottom border-secondary mb-3 py-1"> 
                    <div className='col-md-8'>
                      {task.name} 
                    </div>
                    <div className='col-md-4'>
                      <button  className='btn btn-primary btn-warning mx-1 btn-sm' onClick={() => handleEdit(task)}>Edit</button>
                      <button className='btn btn-danger mx-1 btn-sm ' onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                  </div>
                ))
              : <h4>No result</h4>
            }
        </div>
      </div>
    </main>
  );
}

export default App;
