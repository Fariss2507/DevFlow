export const initialProjects = [
  {
    id: 1,
    name: 'DevFlow',
    description: 'A developer productivity hub combining tasks, bugs, notes and snippets.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    githubRepo: 'https://github.com/example/devflow',
    liveDemo: '',
    status: 'In Progress',
    deadline: '2026-08-10',
    teamMembers: ['You'],
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects and blog posts.',
    techStack: ['React', 'CSS'],
    githubRepo: 'https://github.com/example/portfolio',
    liveDemo: 'https://example.com',
    status: 'Completed',
    deadline: '2026-05-01',
    teamMembers: ['You'],
  },
  {
    id: 3,
    name: 'E-commerce API',
    description: 'REST API for a small e-commerce store with cart and orders.',
    techStack: ['Express', 'MongoDB', 'JWT'],
    githubRepo: '',
    liveDemo: '',
    status: 'Planning',
    deadline: '2026-09-01',
    teamMembers: ['You', 'Ali'],
  },
];

export const statusOptions = ['Planning', 'In Progress', 'On Hold', 'Completed'];