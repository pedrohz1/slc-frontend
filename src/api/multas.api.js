import { api } from '../config/axios';

export async function getMultas() {
  const response = await api.get('/multas');
  return response.data;
}

export async function getMultaById(id) {
  const response = await api.get(`/multas/${id}`);
  return response.data;
}

export async function updateMulta(id, data) {
  await api.put(`/multas/${id}`, data);
}

export async function deleteMulta(id) {
  await api.delete(`/multas/${id}`);
}
