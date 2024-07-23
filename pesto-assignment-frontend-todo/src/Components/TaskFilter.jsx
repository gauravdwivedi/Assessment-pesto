import React from 'react';

const TaskFilter = ({ setFilter }) => {
  return (
    <div className="mb-4">
      <select onChange={(e) => setFilter(e.target.value)} className="border p-2 w-full rounded">
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default TaskFilter;
