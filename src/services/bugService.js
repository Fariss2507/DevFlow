import api from './api';

export const bugService = {
  getAll: () => api.get('/bugs'),
  getById: (id) => api.get(`/bugs/${id}`),
  create: (data) => api.post('/bugs', data),
  update: (id, data) => api.put(`/bugs/${id}`, data),
  delete: (id) => api.delete(`/bugs/${id}`),
};
