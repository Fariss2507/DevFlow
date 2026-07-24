export const summaryStats = [
  {
    id: 1,
    label: 'Tasks Completed',
    value: '87',
    trend: [{ v: 4 }, { v: 6 }, { v: 5 }, { v: 8 }, { v: 7 }, { v: 9 }, { v: 12 }],
  },
  {
    id: 2,
    label: 'Bugs Fixed',
    value: '34',
    trend: [{ v: 2 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }, { v: 6 }],
  },
  {
    id: 3,
    label: 'Coding Hours',
    value: '162h',
    trend: [{ v: 5 }, { v: 6 }, { v: 4 }, { v: 7 }, { v: 8 }, { v: 6 }, { v: 9 }],
  },
];

export const monthlyProgress = [
  { month: 'Feb', tasks: 40, bugs: 12 },
  { month: 'Mar', tasks: 55, bugs: 18 },
  { month: 'Apr', tasks: 48, bugs: 15 },
  { month: 'May', tasks: 70, bugs: 22 },
  { month: 'Jun', tasks: 65, bugs: 20 },
  { month: 'Jul', tasks: 87, bugs: 34 },
];

export const bugsFixedDaily = [
  { day: 'M', count: 3 },
  { day: 'T', count: 5 },
  { day: 'W', count: 2 },
  { day: 'T', count: 6 },
  { day: 'F', count: 4 },
  { day: 'S', count: 1 },
  { day: 'S', count: 0 },
];

export const activityHeatmap = {
  hours: ['6am', '10am', '12pm', '5pm', '8pm'],
  days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  values: [
    [0, 1, 0, 1, 0, 0, 0],
    [2, 3, 2, 4, 3, 1, 0],
    [3, 4, 3, 5, 4, 2, 1],
    [4, 5, 3, 5, 5, 2, 1],
    [1, 2, 1, 3, 2, 0, 0],
  ],
};