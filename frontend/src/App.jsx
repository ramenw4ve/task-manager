import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000/api/tasks/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post(API, { title, completed: false });
    setTitle('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`${API}${task.id}/`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}${id}/`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
