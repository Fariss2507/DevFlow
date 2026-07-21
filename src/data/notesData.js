export const noteCategories = ['Meeting Notes', 'Research', 'Documentation', 'Ideas'];

export const initialNotes = [
  {
    id: 1,
    title: 'Sprint Planning - Week 3',
    content: '## Goals\n- Finish Bug Tracker module\n- Start Notes system\n\n**Blockers:** none so far',
    category: 'Meeting Notes',
    date: '2026-07-18',
  },
  {
    id: 2,
    title: 'JWT Auth Research',
    content: 'Comparing `jsonwebtoken` vs session-based auth.\n\n- JWT is stateless\n- Store token in httpOnly cookie for security',
    category: 'Research',
    date: '2026-07-17',
  },
  {
    id: 3,
    title: 'API Route Naming Convention',
    content: '`/api/auth/*`\n`/api/projects/*`\n`/api/tasks/*`\n\nKeep REST conventions consistent across modules.',
    category: 'Documentation',
    date: '2026-07-16',
  },
  {
    id: 4,
    title: 'Future Feature: AI Commit Messages',
    content: 'Idea: use OpenAI/Claude API to auto-generate commit messages from `git diff` output.',
    category: 'Ideas',
    date: '2026-07-14',
  },
];