function criterioTextoValido(valor) {
  return valor != null && String(valor).trim().length > 0;
}

/**
 * Retorna uma nova lista de livros filtrada pelos critérios (todos opcionais).
 * Critérios de texto vazios ou só com espaços são ignorados.
 *
 * @param {Array<{ id: string, titulo: string, autor: string, ano: number, genero: string }>} livros
 * @param {{
 *   titulo?: string,
 *   autor?: string,
 *   genero?: string,
 *   anoMin?: number,
 *   anoMax?: number,
 * }} [criterios]
 * @returns {typeof livros}
 */
export function filtrarLivros(livros, criterios = {}) {
  if (!Array.isArray(livros)) {
    return [];
  }

  let resultado = [...livros];

  if (criterioTextoValido(criterios.titulo)) {
    const trecho = criterios.titulo.trim().toLowerCase();
    resultado = resultado.filter((l) =>
      l.titulo.toLowerCase().includes(trecho),
    );
  }

  if (criterioTextoValido(criterios.autor)) {
    const trecho = criterios.autor.trim().toLowerCase();
    resultado = resultado.filter((l) =>
      l.autor.toLowerCase().includes(trecho),
    );
  }

  if (criterioTextoValido(criterios.genero)) {
    const g = criterios.genero.trim().toLowerCase();
    resultado = resultado.filter((l) => l.genero.toLowerCase() === g);
  }

  if (
    criterios.anoMin != null &&
    Number.isFinite(Number(criterios.anoMin))
  ) {
    const min = Number(criterios.anoMin);
    resultado = resultado.filter((l) => l.ano >= min);
  }

  if (
    criterios.anoMax != null &&
    Number.isFinite(Number(criterios.anoMax))
  ) {
    const max = Number(criterios.anoMax);
    resultado = resultado.filter((l) => l.ano <= max);
  }

  return resultado;
}
