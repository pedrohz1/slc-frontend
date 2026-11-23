import { api } from '../config/axios';

export async function getModelos() {
  const response = await api.get('/modelos');
  return response.data;
}

export async function getModeloById(id) {
  const response = await api.get(`/modelos/${id}`);
  return response.data;
}

export async function updateModelo(id, data) {
  await api.put(`/modelos/${id}`, data);
}

export async function deleteModelo(id) {
  await api.delete(`/modelos/${id}`);
}
