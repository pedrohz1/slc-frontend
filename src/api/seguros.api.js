import { api } from '../config/axios';

export async function getSeguros() {
  const response = await api.get('/seguros');
  return response.data;
}
