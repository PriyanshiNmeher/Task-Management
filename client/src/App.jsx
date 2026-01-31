import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, user } = useContext(AuthContext);
  const [filter, setFilter] = useState('');

  const loadTasks = async () => {
    try {
      const data = await getTasks(filter);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData);
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdate = async (taskData) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-primary)', margin: 0 }}>
            Task Manager
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Welcome, {user && user.username}
          </p>
        </div>
        <button onClick={logout} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ marginRight: '1rem' }}>Filter by Status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: '3rem' }}>
        <section>
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            initialData={editingTask || {}}
            onCancel={() => setEditingTask(null)}
          />
        </section>

        <section>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            Your Tasks
          </h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
