import { api } from '../config/axios';

export async function getSeguros() {
  const response = await api.get('/seguros');
  return response.data;
}

export async function getSeguroById(id) {
  const response = await api.get(`/seguros/${id}`);
  return response.data;
}
