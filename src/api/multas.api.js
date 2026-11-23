import { api } from '../config/axios';

export async function getMultas() {
  const response = await api.get('/multas');
  return response.data;
}

export async function getMultaById(id) {
  const response = await api.get(`/multas/${id}`);
  return response.data;
}
