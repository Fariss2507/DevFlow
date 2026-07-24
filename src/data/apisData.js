export const methodOptions = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const initialApis = [
  {
    id: 1,
    name: 'Login User',
    method: 'POST',
    endpoint: '/api/auth/login',
    headers: 'Content-Type: application/json',
    requestBody: '{\n  "email": "user@example.com",\n  "password": "••••••••"\n}',
    responseExample: '{\n  "token": "eyJhbGciOi...",\n  "user": { "id": 1, "name": "User" }\n}',
    authDetails: 'No auth required (this is the login endpoint itself)',
  },
  {
    id: 2,
    name: 'Get All Projects',
    method: 'GET',
    endpoint: '/api/projects',
    headers: 'Authorization: Bearer <token>',
    requestBody: '',
    responseExample: '[\n  { "id": 1, "name": "DevFlow", "status": "In Progress" }\n]',
    authDetails: 'Requires JWT in Authorization header',
  },
  {
    id: 3,
    name: 'Create Task',
    method: 'POST',
    endpoint: '/api/tasks',
    headers: 'Authorization: Bearer <token>\nContent-Type: application/json',
    requestBody: '{\n  "title": "Fix bug",\n  "priority": "High",\n  "status": "Todo"\n}',
    responseExample: '{\n  "id": 12,\n  "title": "Fix bug",\n  "status": "Todo"\n}',
    authDetails: 'Requires JWT in Authorization header',
  },
];