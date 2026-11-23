import { api } from '../config/axios';

export async function getModelos() {
  const response = await api.get('/modelos');
  return response.data;
}

export async function getModeloById(id) {
  const response = await api.get(`/modelos/${id}`);
  return response.data;
}
