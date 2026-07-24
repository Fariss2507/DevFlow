import api from './api';

export const snippetService = {
  getAll: () => api.get('/snippets'),
  getById: (id) => api.get(`/snippets/${id}`),
  create: (data) => api.post('/snippets', data),
  update: (id, data) => api.put(`/snippets/${id}`, data),
  delete: (id) => api.delete(`/snippets/${id}`),
};
