import { api } from '../config/axios';

export async function getSeguros() {
  const response = await api.get('/seguros');
  return response.data;
}

export async function getSeguroById(id) {
  const response = await api.get(`/seguros/${id}`);
  return response.data;
}

export async function updateSeguro(id, data) {
  await api.put(`/seguros/${id}`, data);
}

export async function deleteSeguro(id) {
  await api.delete(`/seguros/${id}`);
}
