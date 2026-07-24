export const initialNotifications = [
  {
    id: 1,
    type: 'Deadline',
    message: 'Project "DevFlow" deadline is in 3 days',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'Task',
    message: 'New task assigned: "Set up MongoDB models"',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'Bug',
    message: 'You were assigned a Critical bug: "Crash on empty project form"',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'Release',
    message: 'v1.0 Frontend Release scheduled for Jul 31',
    time: '2 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'Task',
    message: 'Task "Design login page UI" marked as Completed',
    time: '3 days ago',
    read: true,
  },
];

export const notifIcons = {
  Deadline: '⏰',
  Task: '📝',
  Bug: '🐞',
  Release: '🚀',
};