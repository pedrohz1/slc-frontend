import { api } from '../../config/axios';

export async function getLocais() {
  const response = await api.get('/locais');
  return response.data;
}

export async function getLocalById(id) {
  const response = await api.get(`/locais/${id}`);
  return response.data;
}

export async function createLocal(data) {
  await api.post('/locais', data);
}

export async function updateLocal(id, data) {
  await api.put(`/locais/${id}`, data);
}

export async function deleteLocal(id) {
  await api.delete(`/locais/${id}`);
}
