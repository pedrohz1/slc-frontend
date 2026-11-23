import { api } from '../config/axios';

export async function getClientes() {
  const response = await api.get('/clientes');
  return response.data;
}

export async function getClienteById(id) {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
}
