import { api } from '../config/axios';

export async function getMultas() {
  const response = await api.get('/multas');
  return response.data;
}
