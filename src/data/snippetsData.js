export const languageOptions = [
  'javascript', 'python', 'css', 'html', 'jsx', 'json', 'bash', 'sql',
];

export const initialSnippets = [
  {
    id: 1,
    title: 'Debounce Function',
    language: 'javascript',
    description: 'Delays function execution until after wait time has elapsed',
    code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
    tags: ['utility', 'performance'],
    favorite: true,
  },
  {
    id: 2,
    title: 'Flexbox Center',
    language: 'css',
    description: 'Center a child element both horizontally and vertically',
    code: `.center {
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    tags: ['css', 'layout'],
    favorite: false,
  },
  {
    id: 3,
    title: 'Fetch with Error Handling',
    language: 'javascript',
    description: 'Basic fetch wrapper with try/catch',
    code: `async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}`,
    tags: ['api', 'async'],
    favorite: true,
  },
  {
    id: 4,
    title: 'Python List Comprehension',
    language: 'python',
    description: 'Filter even numbers from a list',
    code: `nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]`,
    tags: ['python', 'basics'],
    favorite: false,
  },
];