# LabTDD

Laboratório de **TDD** (Test-Driven Development): função que filtra uma lista de livros por critérios opcionais, com **banco mockado**, **testes (Vitest)** e **front-end** (Vite).

## Estrutura

| Arquivo | Função |
|--------|--------|
| `src/mockDatabase.js` | Catálogo estático (`LIVROS_MOCK`) |
| `src/booksFilter.js` | `filtrarLivros(livros, criterios)` |
| `tests/booksFilter.test.js` | Testes da função de filtro |
| `index.html` + `src/main.js` | Interface para testar os filtros no navegador |

## Critérios de filtro

- **titulo** / **autor**: busca parcial (sem diferenciar maiúsculas)
- **genero**: igualdade (sem diferenciar maiúsculas)
- **anoMin** / **anoMax**: intervalo inclusivo de ano

Critérios de texto vazios ou só com espaços são ignorados.

## Requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)

## Como rodar

```bash
npm install
npm test          # roda a suíte uma vez
npm run test:watch # modo observador (TDD)
npm run dev        # front em http://localhost:5173 (porta pode variar)
```

## Enviar alterações para o GitHub

No PowerShell, na pasta do projeto:

```powershell
cd c:\Users\felip\Downloads\labtdd\LabTDD
git add README.md
git commit -m "Atualiza README com documentação do projeto"
git push
```

Para incluir **todos** os arquivos modificados de uma vez:

```powershell
git add -A
git status
git commit -m "Sua mensagem descrevendo a mudança"
git push
```

Se for o primeiro push deste branch em uma máquina nova:

```powershell
git push -u origin main
```
