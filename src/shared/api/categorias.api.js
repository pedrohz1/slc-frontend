import { api } from '../../config/axios';

export async function getCategorias() {
  const response = await api.get('/categorias');
  return response.data;
}

export async function getCategoriaById(id) {
  const response = await api.get(`/categorias/${id}`);
  return response.data;
}

export async function updateCategoria(id, data) {
  await api.put(`/categorias/${id}`, data);
}

export async function deleteCategoria(id) {
  await api.delete(`/categorias/${id}`);
}
