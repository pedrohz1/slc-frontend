export function formatarMoeda(valor) {
  if (valor == null || valor === '') return '';

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function lerMoeda(texto) {
  const centavos = Number(texto.replace(/\D/g, ''));
  return centavos ? centavos / 100 : '';
}
