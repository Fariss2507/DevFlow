export const severityOptions = ['Low', 'Medium', 'High', 'Critical'];
export const bugStatusOptions = ['Open', 'In Progress', 'Fixed', 'Closed'];

export const initialBugs = [
  {
    id: 1,
    title: 'Login button not responsive on mobile',
    description: 'Sign In button overflows on screens smaller than 375px',
    severity: 'Medium',
    stepsToReproduce: '1. Open app on mobile\n2. Go to /login\n3. Observe button width',
    screenshot: null,
    assignedDeveloper: 'You',
    status: 'Open',
    dateReported: '2026-07-18',
  },
  {
    id: 2,
    title: 'Task drag-and-drop occasionally fails',
    description: 'Dragging a card sometimes does not update its status',
    severity: 'High',
    stepsToReproduce: '1. Go to /tasks\n2. Drag a card fast between columns\n3. Card sometimes stays in old column',
    screenshot: null,
    assignedDeveloper: 'You',
    status: 'In Progress',
    dateReported: '2026-07-19',
  },
  {
    id: 3,
    title: 'Crash on empty project form submit',
    description: 'Submitting project form with empty name field throws console error',
    severity: 'Critical',
    stepsToReproduce: '1. Click + New Project\n2. Leave name empty\n3. Click Create',
    screenshot: null,
    assignedDeveloper: 'Ali',
    status: 'Fixed',
    dateReported: '2026-07-15',
  },
];