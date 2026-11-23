import { api } from '../config/axios';

export async function getLocacoes() {
  const response = await api.get('/locacoes');
  return response.data;
}
