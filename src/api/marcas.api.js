import { api } from '../config/axios';

export async function getMarcas() {
  const response = await api.get('/marcas');
  return response.data;
}

export async function getMarcaById(id) {
  const response = await api.get(`/marcas/${id}`);
  return response.data;
}
