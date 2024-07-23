import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border p-4 mb-2 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <TaskForm
          existingTask={task}
          updateTask={(updatedTask) => {
            updateTask(updatedTask);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <div className="flex justify-between items-center mt-2">
            <select
              value={task.status}
              onChange={(e) => updateTask({token:localStorage.getItem('authToken'),updatedTask:{ ...task, status: e.target.value }})}
              className="border p-2 rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask({token:localStorage.getItem('authToken'),taskId:task._id})}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
