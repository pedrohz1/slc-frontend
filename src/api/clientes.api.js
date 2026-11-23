import { api } from '../config/axios';

export async function getClientes() {
  const response = await api.get('/clientes');
  return response.data;
}
