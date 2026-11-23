import { api } from '../config/axios';

export async function getCaracteristicas() {
  const response = await api.get('/caracteristicas');
  return response.data;
}
