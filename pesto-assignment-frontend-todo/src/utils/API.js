import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Replace this with your actual API URL
});

//http://localhost:8000/api/v1/doctors/login

export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const registerUser = (username,email,password)=>{
  return api.post('/auth/register',{username,email,password});
}

  
  export const fetchTasks = (token) => {
    return api.get('/tasks/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  

  
  export const addTask = (token,task) => {  
      
    
    
    return api.post('/tasks/add', task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const updateTask = (token, taskId, updatedTask) => {
    return api.put(`/tasks/edit/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const deleteTask = (token, taskId) => {
    return api.delete(`/tasks/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };