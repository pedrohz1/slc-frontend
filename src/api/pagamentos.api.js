import { api } from '../config/axios';

export async function getPagamentos() {
  const response = await api.get('/pagamentos');
  return response.data;
}
