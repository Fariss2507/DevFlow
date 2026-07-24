import api from './api';

export const timeLogService = {
  getAll: () => api.get('/timelogs'),
  create: (data) => api.post('/timelogs', data),
  delete: (id) => api.delete(`/timelogs/${id}`),
};
