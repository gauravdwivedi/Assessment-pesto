import React, { useState, useEffect, useContext } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import TaskFilter from './Components/TaskFilter';
import Login from './Components/Login';
import './index.css';
import { fetchTasks, addTask as apiAddTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from './utils/API';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { isAuthenticated, logout,  username} = useContext(AuthContext);

  
  useEffect(() => { 
    if (isAuthenticated) {
      console.log('IF true')
      fetchTasks(localStorage.getItem('authToken'))
        .then(response => {
          setTasks(response.data.message);
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [isAuthenticated]);

  const addTask = (token,task) => { 
    apiAddTask(token, task)
      .then(response => {
        console.log(response,'response')
        setTasks([...tasks, response.data.message]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const updateTask = ({token,updatedTask}) => { debugger
    console.log(updateTask,'Update Task ()')
    apiUpdateTask(token, updatedTask._id, updatedTask)
      .then(() => {
        console.log(updatedTask,'Updated Tasks', tasks)
        setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
      
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = ({token,taskId}) => {
    apiDeleteTask(token, taskId)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
         <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  {username}
                </div>
                <svg className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <button className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Task Management</h1>
          <TaskForm addTask={addTask} isAuthenticated={isAuthenticated} />
          <TaskFilter setFilter={setFilter}  isAuthenticated={isAuthenticated}/>
          <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} isAuthenticated={isAuthenticated} />
        </>
      ) : (
        <Login  />
      )}
    </div>
  );
}

export default App;
