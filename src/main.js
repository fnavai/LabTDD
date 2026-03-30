import { LIVROS_MOCK } from './mockDatabase.js';
import { filtrarLivros } from './booksFilter.js';

const form = document.getElementById('form-filtros');
const lista = document.getElementById('lista-livros');
const contagem = document.getElementById('contagem');
const btnLimpar = document.getElementById('btn-limpar');

function lerCriteriosDoFormulario() {
  const fd = new FormData(form);
  const titulo = (fd.get('titulo') ?? '').toString();
  const autor = (fd.get('autor') ?? '').toString();
  const genero = (fd.get('genero') ?? '').toString();
  const anoMinRaw = (fd.get('anoMin') ?? '').toString().trim();
  const anoMaxRaw = (fd.get('anoMax') ?? '').toString().trim();

  const criterios = { titulo, autor, genero };
  if (anoMinRaw !== '') {
    criterios.anoMin = Number(anoMinRaw);
  }
  if (anoMaxRaw !== '') {
    criterios.anoMax = Number(anoMaxRaw);
  }
  return criterios;
}

function renderizar(livros) {
  lista.innerHTML = '';
  if (livros.length === 0) {
    const div = document.createElement('div');
    div.className = 'empty';
    div.textContent =
      'Nenhum livro corresponde aos filtros. Tente ajustar os critérios.';
    lista.appendChild(div);
    contagem.textContent = '0 resultados';
    return;
  }

  contagem.textContent =
    livros.length === 1 ? '1 resultado' : `${livros.length} resultados`;

  const frag = document.createDocumentFragment();
  for (const livro of livros) {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${escapeHtml(livro.titulo)}</h2>
      <p class="author">${escapeHtml(livro.autor)}</p>
      <p class="detail">${escapeHtml(livro.genero)} · ${livro.ano}</p>
    `;
    frag.appendChild(article);
  }
  lista.appendChild(frag);
}

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const criterios = lerCriteriosDoFormulario();
  renderizar(filtrarLivros(LIVROS_MOCK, criterios));
});

btnLimpar.addEventListener('click', () => {
  form.reset();
  renderizar(filtrarLivros(LIVROS_MOCK, {}));
});

renderizar(filtrarLivros(LIVROS_MOCK, {}));
