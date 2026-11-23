import { api } from '../../config/axios';

export async function getDados() {
  const response = await api.get('/dashboard');
  return response.data;
}
