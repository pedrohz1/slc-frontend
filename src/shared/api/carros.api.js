import { api } from '../../config/axios';

export async function getCarros() {
  const response = await api.get('/carros');
  return response.data;
}

export async function getCarroById(id) {
  const response = await api.get(`/carros/${id}`);
  return response.data;
}

export async function updateCarro(id, data) {
  await api.put(`/carros/${id}`, data);
}

export async function deleteCarro(id) {
  await api.delete(`/carros/${id}`);
}
