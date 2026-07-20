import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { initialTasks, statusColumns } from '../../data/tasksData';
import './Tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  const openNewForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSave = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleDragStart = (e, id) => {
    setDraggedId(id);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    setTasks(tasks.map((t) => (t.id === draggedId ? { ...t, status } : t)));
    setDraggedId(null);
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Tasks</h1>
        <button className="btn-primary" onClick={openNewForm}>+ New Task</button>
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