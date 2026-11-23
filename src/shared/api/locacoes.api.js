import { api } from '../../config/axios';

export async function getLocacoes() {
  const response = await api.get('/locacoes');
  return response.data;
}

export async function getLocacaoById(id) {
  const response = await api.get(`/locacoes/${id}`);
  return response.data;
}

export async function updateLocacao(id, data) {
  await api.put(`/locacoes/${id}`, data);
}

export async function deleteLocacao(id) {
  await api.delete(`/locacoes/${id}`);
}
