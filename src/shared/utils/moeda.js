export function formatarMoeda(valor) {
  if (valor == null || valor === '') return '';

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Interpreta os dígitos digitados como centavos: "R$ 1.234,56" -> 1234.56
export function lerMoeda(texto) {
  const centavos = Number(texto.replace(/\D/g, ''));
  return centavos ? centavos / 100 : '';
}
