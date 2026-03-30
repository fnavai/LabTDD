import { describe, it, expect } from 'vitest';
import { filtrarLivros } from '../src/booksFilter.js';
import { LIVROS_MOCK } from '../src/mockDatabase.js';

describe('filtrarLivros', () => {
  it('sem critérios devolve uma cópia de todos os livros', () => {
    const resultado = filtrarLivros(LIVROS_MOCK, {});
    expect(resultado).toHaveLength(LIVROS_MOCK.length);
    expect(resultado).not.toBe(LIVROS_MOCK);
    expect(resultado.map((l) => l.id).sort()).toEqual(
      LIVROS_MOCK.map((l) => l.id).sort(),
    );
  });

  it('critérios undefined ou omitidos equivalem a objeto vazio', () => {
    expect(filtrarLivros(LIVROS_MOCK).length).toBe(LIVROS_MOCK.length);
  });

  it('filtra por título (parcial, ignorando maiúsculas)', () => {
    const r = filtrarLivros(LIVROS_MOCK, { titulo: 'pequeno' });
    expect(r).toHaveLength(1);
    expect(r[0].titulo).toBe('O Pequeno Príncipe');
  });

  it('filtra por autor (parcial, ignorando maiúsculas)', () => {
    const r = filtrarLivros(LIVROS_MOCK, { autor: 'machado' });
    expect(r).toHaveLength(2);
    expect(r.every((l) => l.autor.includes('Machado'))).toBe(true);
  });

  it('filtra por gênero (comparação case-insensitive)', () => {
    const r = filtrarLivros(LIVROS_MOCK, { genero: 'ficção científica' });
    expect(r).toHaveLength(2);
    expect(r.map((l) => l.titulo).sort()).toEqual(['1984', 'Fundação'].sort());
  });

  it('filtra por ano mínimo e máximo (inclusivo)', () => {
    const r = filtrarLivros(LIVROS_MOCK, { anoMin: 1940, anoMax: 1951 });
    expect(r.map((l) => l.titulo).sort()).toEqual(
      ['1984', 'Fundação', 'O Pequeno Príncipe'].sort(),
    );
  });

  it('combina critérios com lógica E', () => {
    const r = filtrarLivros(LIVROS_MOCK, {
      autor: 'asimov',
      genero: 'Ficção científica',
    });
    expect(r).toHaveLength(1);
    expect(r[0].titulo).toBe('Fundação');
  });

  it('sem correspondência devolve lista vazia', () => {
    expect(filtrarLivros(LIVROS_MOCK, { titulo: 'xyz-inexistente' })).toEqual(
      [],
    );
  });

  it('ignora chaves de critério vazias ou só com espaços', () => {
    const r = filtrarLivros(LIVROS_MOCK, {
      titulo: '   ',
      autor: '',
      genero: null,
    });
    expect(r.length).toBe(LIVROS_MOCK.length);
  });
});
