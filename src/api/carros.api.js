import { api } from '../config/axios';

export async function getCarros() {
  const response = await api.get('/carros');
  return response.data;
}
