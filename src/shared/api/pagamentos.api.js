import { api } from '../../config/axios';

export async function getPagamentos() {
  const response = await api.get('/pagamentos');
  return response.data;
}

export async function getPagamentoById(id) {
  const response = await api.get(`/pagamentos/${id}`);
  return response.data;
}

export async function updatePagamento(id, data) {
  await api.put(`/pagamentos/${id}`, data);
}

export async function deletePagamento(id) {
  await api.delete(`/pagamentos/${id}`);
}
