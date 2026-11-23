import { api } from '../../config/axios';

export async function getMarcas() {
  const response = await api.get('/marcas');
  return response.data;
}

export async function getMarcaById(id) {
  const response = await api.get(`/marcas/${id}`);
  return response.data;
}

export async function updateMarca(id, data) {
  await api.put(`/marcas/${id}`, data);
}

export async function deleteMarca(id) {
  await api.delete(`/marcas/${id}`);
}
