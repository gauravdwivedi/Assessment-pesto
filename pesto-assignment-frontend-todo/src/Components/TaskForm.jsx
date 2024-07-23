import React, { useState } from 'react';

const TaskForm = ({ addTask, existingTask, updateTask }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [status, setStatus] = useState(existingTask ? existingTask.status : 'To Do');
  const [error, setError] = useState('');

  const handleSubmit = e => { debugger
    e.preventDefault();
    if (!title) {
      setError('Title cannot be empty');
      return;
    }

    const task = { _id: existingTask ? existingTask._id : Date.now(), title, description, status };
    if (existingTask) {
      updateTask({token:localStorage.getItem('authToken'),updatedTask:task});
    } else {
      addTask(localStorage.getItem('authToken'),task);
    }

    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-2">
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        ></textarea>
      </div>
      <div className="mb-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {existingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
