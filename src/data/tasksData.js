export const statusColumns = ['Todo', 'In Progress', 'Review', 'Completed'];

export const priorityOptions = ['Low', 'Medium', 'High'];

export const initialTasks = [
  {
    id: 1,
    title: 'Design login page UI',
    description: 'Create wireframe and final design for login/register',
    priority: 'High',
    dueDate: '2026-07-22',
    status: 'Completed',
    labels: ['UI', 'Auth'],
    estimatedTime: '3h',
  },
  {
    id: 2,
    title: 'Set up MongoDB models',
    description: 'Define schemas for User, Project, Task, Bug',
    priority: 'High',
    dueDate: '2026-07-25',
    status: 'Todo',
    labels: ['Backend', 'Database'],
    estimatedTime: '4h',
  },
  {
    id: 3,
    title: 'Build task Kanban board',
    description: 'Drag and drop task cards between status columns',
    priority: 'Medium',
    dueDate: '2026-07-21',
    status: 'In Progress',
    labels: ['Frontend'],
    estimatedTime: '5h',
  },
  {
    id: 4,
    title: 'Write API documentation',
    description: 'Document all auth and project endpoints',
    priority: 'Low',
    dueDate: '2026-07-28',
    status: 'Review',
    labels: ['Docs'],
    estimatedTime: '2h',
  },
];