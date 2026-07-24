import { initialProjects } from '@/data/projectsData';
import { initialTasks } from '@/data/tasksData';
import { initialBugs } from '@/data/bugsData';
import { initialNotes } from '@/data/notesData';
import { initialSnippets } from '@/data/snippetsData';
import { initialApis } from '@/data/apisData';


export function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results = [];

  initialProjects.forEach((p) => {
    if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
      results.push({ type: 'Project', title: p.name, subtitle: p.status, link: '/projects', id: p.id });
    }
  });

  initialTasks.forEach((t) => {
    if (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
      results.push({ type: 'Task', title: t.title, subtitle: t.status, link: '/tasks', id: t.id });
    }
  });

  initialBugs.forEach((b) => {
    if (b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)) {
      results.push({ type: 'Bug', title: b.title, subtitle: b.severity, link: '/bugs', id: b.id });
    }
  });

  initialNotes.forEach((n) => {
    if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
      results.push({ type: 'Note', title: n.title, subtitle: n.category, link: '/notes', id: n.id });
    }
  });

  initialSnippets.forEach((s) => {
    if (s.title.toLowerCase().includes(q) || s.tags.some((t) => t.toLowerCase().includes(q))) {
      results.push({ type: 'Snippet', title: s.title, subtitle: s.language, link: '/snippets', id: s.id });
    }
  });

  initialApis.forEach((a) => {
    if (a.name.toLowerCase().includes(q) || a.endpoint.toLowerCase().includes(q)) {
      results.push({ type: 'API', title: a.name, subtitle: a.endpoint, link: '/apis', id: a.id });
    }
  });

  return results;
}

export const typeIcons = {
  Project: '📁',
  Task: '📝',
  Bug: '🐞',
  Note: '📄',
  Snippet: '💻',
  API: '🔌',
};