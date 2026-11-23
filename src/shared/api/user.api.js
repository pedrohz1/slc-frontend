import { api } from '../../config/axios';

export async function getUsuarios() {
  const response = await api.get('/usuarios');
  return response.data;
}