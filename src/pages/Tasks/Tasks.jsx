import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { statusColumns } from '../../data/tasksData';
import api from '../../services/api';
import './Tasks.css';
import AuroraBackground from '../../components/AuroraBackground';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      const mapped = res.data.map((task) => ({
        ...task,
        id: task._id,
      }));
      setTasks(mapped);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSave = async (task) => {
    try {
      if (editingTask) {
        const res = await api.put(`/tasks/${editingTask.id}`, task);

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const res = await api.post('/tasks', task);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setTasks([...tasks, created]);
      }

      setShowForm(false);
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleDragStart = (e, id) => {
    setDraggedId(id);
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();

    const task = tasks.find((t) => t.id === draggedId);
    if (!task) return;

    try {
      await api.put(`/tasks/${draggedId}`, {
        ...task,
        status,
      });

      setTasks(
        tasks.map((t) =>
          t.id === draggedId
            ? {
                ...t,
                status,
              }
            : t
        )
      );
    } catch (err) {
      console.error('Failed to update task status', err);
    }

    setDraggedId(null);
  };

  const allowDrop = (e) => e.preventDefault();

  if (loading) {
    return (
      <div className="page">
        <h1>Tasks</h1>
        <p className="empty-state">Loading tasks...</p>
      </div>
    );
  }
    return (
    <div className="page">
      
      <div className="page-header">
        <h1>Tasks</h1>
        <button className="btn-primary" onClick={openNewForm}>
          + New Task
        </button>
      </div>

      <div className="kanban-board">
        {statusColumns.map((status) => (
          <div
            className="kanban-column"
            key={status}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="kanban-column-header">
              <h3>{status}</h3>

              <span className="kanban-count">
                {tasks.filter((t) => t.status === status).length}
              </span>
            </div>

            <div className="kanban-column-body">
              {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                    onDragStart={handleDragStart}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <TaskForm
          existingTask={editingTask}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}