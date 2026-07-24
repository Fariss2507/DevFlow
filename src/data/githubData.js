export const initialRepos = [
  {
    id: 1,
    projectName: 'DevFlow',
    repoUrl: 'https://github.com/Fariss2507/DevFlow',
    branch: 'main',
    lastCommit: {
      message: 'feat: add api collection module',
      author: 'Fariss2507',
      date: '2026-07-20',
    },
    pullRequests: [
      { id: 1, title: 'Add snippet syntax highlighting', status: 'Open' },
      { id: 2, title: 'Fix auth page responsiveness', status: 'Merged' },
    ],
    issues: [
      { id: 1, title: 'Sidebar overlaps on small screens', status: 'Open' },
      { id: 2, title: 'Login form validation missing', status: 'Closed' },
    ],
  },
];