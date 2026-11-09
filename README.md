# Lista de Tarefas

API REST simples para gerenciar uma lista de tarefas (criar, listar, concluir e remover).
Projeto individual da disciplina de **Gerência de Configuração e Processos de Software**, em que
aplico o **Plano de Gerenciamento de Configuração — Enfoque DevOps (CI/CD)**.

O plano de GCS deste projeto está em [`docs/plano-gcs.md`](docs/plano-gcs.md).

## Stack

| Item          | Tecnologia                   |
| ------------- | ---------------------------- |
| Linguagem     | Node.js 22 (ver `.nvmrc`)    |
| Framework     | Express                      |
| Testes        | Jest + Supertest             |
| Versionamento | Git + GitHub (GitHub Flow)   |
| Pipeline      | GitHub Actions (próximas aulas) |

## Estrutura do repositório

| Caminho                | Conteúdo                                                   |
| ---------------------- | ---------------------------------------------------------- |
| `src/`                 | Código-fonte da API (`app.js` = rotas, `server.js` = início) |
| `tests/`               | Testes automatizados                                       |
| `docs/`                | Plano de GCS e evidências                                   |
| `.github/`             | Template de PR, templates de Issue e CODEOWNERS            |
| `package-lock.json`    | Versões exatas das dependências (lockfile)                 |
| `.env.example`         | Variáveis de ambiente necessárias, sem valores reais       |

## Como instalar e rodar

```bash
git clone https://github.com/nicolascsnt/lista-tarefas.git
cd lista-tarefas
npm ci            # instala exatamente as versões do package-lock.json
cp .env.example .env
npm start         # API em http://localhost:3000
```

## Como rodar os testes

```bash
npm test
```

## Endpoints

| Método | Rota                     | Descrição                 |
| ------ | ------------------------ | ------------------------- |
| GET    | `/saude`                 | Verificação de saúde      |
| GET    | `/tarefas`               | Lista as tarefas          |
| POST   | `/tarefas`               | Cria (`{ "titulo": "..." }`) |
| PATCH  | `/tarefas/:id/concluir`  | Marca como concluída      |
| DELETE | `/tarefas/:id`           | Remove                    |

## Como contribuir

A branch `main` é protegida: nenhuma alteração entra sem Pull Request aprovado pelo par de revisão.

1. Crie uma branch `feature/<issue>-<descricao-curta>`.
2. Use Conventional Commits no título do PR (ex.: `feat(api): adiciona filtro por status`).
3. Abra o Pull Request preenchendo o template e aguarde a aprovação.
4. O merge é feito somente por *squash*.

## Ambientes

| Environment  | Regra                                                        |
| ------------ | ------------------------------------------------------------ |
| `staging`    | somente branches protegidas                                  |
| `production` | somente branches protegidas + aprovação obrigatória do líder |
