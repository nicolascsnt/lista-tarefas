# Lista de Tarefas — Plano de Gerenciamento de Configuração

**Enfoque DevOps — Integração e Entrega Contínuas (CI/CD)**
Versão 1.0

| Campo                               | Descrição                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------- |
| Projeto                             | Lista de Tarefas — API REST para gerenciamento de tarefas                 |
| Gerente de Projeto / Product Owner  | Nicolas Corrêa Santos (Desenvolvedor Líder)                               |
| Responsável de GCS / DevOps         | Nicolas Corrêa Santos                                                     |
| Equipe                              | 1 Desenvolvedor Líder + 1 par de revisão (colega da disciplina)           |
| Repositório principal               | GitHub, plano gratuito, repositório público                              |
| Regime de trabalho                  | Projeto acadêmico individual, com revisão cruzada assíncrona             |
| Plano de referência                 | PGC — DevOps ONGConecta (Prof. lzcamargo/ongconecta)                     |

## Histórico de Revisões

| Data       | Versão | Descrição                                                                 | Autor                 |
| ---------- | ------ | ------------------------------------------------------------------------- | --------------------- |
| 09/11/2026 | 1.0    | Elaboração do plano a partir do PGC da ONGConecta, adaptado a projeto individual com par de revisão. | Nicolas Corrêa Santos |

---

## 1. Introdução

Este Plano de Gerenciamento de Configuração (PGC) descreve as atividades de Gestão de
Configuração de Software (GCS) aplicadas ao projeto **Lista de Tarefas**, uma API REST em
Node.js. O plano segue o enfoque DevOps do plano de referência da disciplina (ONGConecta),
com Integração Contínua (CI), Entrega Contínua (CD) e uso exclusivo de ferramentas gratuitas.

O projeto parte de três restrições concretas: (1) equipe de uma pessoa, com um colega atuando
como par de revisão; (2) dedicação parcial, conciliada com as demais disciplinas; (3) nenhum
orçamento para infraestrutura. Por isso, o plano faz simplificações deliberadas em relação ao
de referência: não há aplicativo mobile, o CCM é reduzido ao líder e ao par, e os ambientes
são os Environments nativos do GitHub.

### 1.1 Finalidade

Estabelecer um padrão simples e sustentável que garanta rastreabilidade, versionamento e
controle de mudanças da API, apoiado por pipelines automatizados, com o mínimo de burocracia.

### 1.2 Escopo

O plano se aplica a:

- **Desenvolvedor Líder** (Nicolas Corrêa Santos): implementa, mantém os pipelines, define a
  estratégia de branching e aprova implantações em produção;
- **Par de revisão**: colega da disciplina com acesso de escrita, responsável por revisar e
  aprovar os Pull Requests do líder (o GitHub não permite aprovar o próprio PR).

O escopo abrange o código-fonte da API, os testes, a configuração do repositório, os
pipelines e a documentação.

### 1.3 Definições, Acrônimos e Abreviações

| Termo        | Significado                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| GCS          | Gestão de Configuração de Software                                          |
| IC           | Item de Configuração                                                        |
| CI           | Integração Contínua (Continuous Integration)                                |
| CD           | Entrega/Implantação Contínua (Continuous Delivery / Deployment)             |
| CCM          | Comitê de Controle de Mudanças (aqui: líder + par de revisão)               |
| Baseline     | Conjunto de ICs que atingiu um estado comprovado de estabilidade            |
| GitHub Flow  | Estratégia com `main` sempre implantável e branches de feature de vida curta |
| SemVer       | Versionamento Semântico (MAJOR.MINOR.PATCH)                                 |
| PR           | Pull Request                                                                |

### 1.4 Referências

- PGC — DevOps ONGConecta, versão 1.0 (plano de referência da disciplina).
- Roteiro da Aula 1 — "Preparar o repositório do seu projeto" (repositório ONGConecta).
- Documentação oficial do GitHub (branch protection, Environments, Actions).

### 1.5 Visão Geral

A GCS é tratada como parte do fluxo de entrega, e não como atividade manual em marcos
formais: cada PR revisado, testado e integrado gera evidências de rastreabilidade (histórico
de commits, revisões, logs de pipeline e tags de versão).

## 2. Papéis na Gerência de Configuração

| Papel (referência)                  | Quem exerce               | Responsabilidades                                                       |
| ----------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| Gerente de Projeto / Product Owner  | Desenvolvedor Líder       | Prioriza as Issues e decide o que entra em cada versão.                 |
| Engenheiro DevOps / Release         | Desenvolvedor Líder       | Mantém pipelines, branching, versionamento e environments.              |
| Desenvolvedor                       | Desenvolvedor Líder       | Implementa funcionalidades e testes automatizados.                      |
| Revisor de código                   | Par de revisão            | Revisa e aprova os PRs; é chamado automaticamente pelo `CODEOWNERS`.    |
| QA / Automação de testes            | Desenvolvedor Líder       | Mantém a suíte de testes executada no pipeline.                         |
| Segurança (DevSecOps)               | Desenvolvedor Líder       | Revisa alertas do Dependabot e garante que não haja segredos no código. |
| CCM                                 | Líder + par de revisão    | Decide apenas sobre mudanças de alto risco (seção 8.2).                 |

### 2.1 Comunicação assíncrona

- Descrições de PR completas (contexto, decisão, como testar), seguindo o template do repositório;
- Prazo de resposta a um PR: até 3 dias úteis;
- Dúvidas e decisões registradas nos comentários do PR ou da Issue.

## 3. Ferramentas, Ambientes e Infraestrutura

### 3.1 Ferramentas

| Categoria                 | Ferramenta                  | Finalidade                                              |
| ------------------------- | --------------------------- | ------------------------------------------------------- |
| Controle de versão        | Git + GitHub (gratuito)     | Versionamento de código, configuração e documentação    |
| CI/CD                     | GitHub Actions              | Build, testes e implantação automatizados               |
| Runtime                   | Node.js 22 + Express        | Execução da API                                         |
| Testes                    | Jest + Supertest            | Testes unitários e de integração das rotas              |
| Gestão de segredos        | GitHub Secrets / Environments | Credenciais usadas pelo pipeline, fora do código      |
| Dependências / SCA        | Dependabot                  | Alertas e PRs automáticos de atualização                |
| Rastreamento de tarefas   | GitHub Issues               | Vincular commits e PRs a itens de trabalho              |

### 3.2 Ambientes

| Ambiente                | Finalidade                                    | Regra no GitHub                                                       | Gatilho de promoção                 |
| ----------------------- | --------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------- |
| Desenvolvimento / Local | Desenvolvimento e testes na máquina do líder  | —                                                                     | —                                   |
| `staging`               | Validação da versão integrada                 | *Deployment branches*: somente branches protegidas                    | Merge na `main`                     |
| `production`            | Versão oficial                                | Somente branches protegidas + **revisor obrigatório: Desenvolvedor Líder** | Aprovação manual do líder       |

### 3.3 Estratégia de Branching e Versionamento

Adota-se o **GitHub Flow**:

- `main`: sempre implantável; **protegida** por regra que exige PR, 1 aprovação, histórico
  linear e não permite exceções (nem para o administrador);
- `feature/<issue>-<descricao-curta>`: uma branch por funcionalidade ou correção;
- `hotfix/<descricao>`: correções urgentes, também via PR.

Merge somente por **squash**, usando título e descrição do PR como mensagem; as branches são
apagadas automaticamente após o merge. Versionamento por **SemVer** e **Conventional Commits**
(`feat`, `fix`, `docs`, `chore`, `refactor`, `test`).

## 4. Identificação da Configuração

### 4.1 Itens de Configuração

Todos versionados no repositório:

- Código-fonte da API (`src/`) e testes automatizados (`tests/`);
- Manifesto e lockfile de dependências (`package.json`, `package-lock.json`);
- Versão do runtime (`.nvmrc`);
- Regras do repositório: `.gitignore`, `.gitattributes`;
- Modelo de variáveis de ambiente sem valores reais (`.env.example`); segredos ficam no GitHub Secrets;
- Modelos de colaboração: `.github/pull_request_template.md`, `.github/CODEOWNERS`,
  `.github/ISSUE_TEMPLATE/`;
- Definições de pipeline (`.github/workflows/`, a partir da Aula 2);
- Documentação: `README.md` e **este plano** (`docs/plano-gcs.md`), que também é um IC.

### 4.2 Convenção de Nomenclatura

| Item               | Convenção                                      | Exemplo                                  |
| ------------------ | ---------------------------------------------- | ---------------------------------------- |
| Branch de feature  | `feature/<issue>-<descricao-curta>`            | `feature/3-filtro-por-status`            |
| Commit / título PR | `<tipo>(<escopo>): <descrição>`                | `feat(api): adiciona filtro por status`  |
| Tag de release     | `vX.Y.Z`                                       | `v0.2.0`                                 |

### 4.3 Estrutura do Repositório

```
/src            código da API
/tests          testes automatizados
/docs           plano de GCS e evidências
/.github        templates, CODEOWNERS e workflows
README.md, package.json, package-lock.json, .nvmrc, .gitignore, .gitattributes, .env.example
```

## 5. Integração Contínua (CI)

Todo PR para a `main` dispara um pipeline de CI. Nenhuma mudança é integrada sem pipeline verde.

### 5.1 Etapas do Pipeline de CI

- Checkout e `npm ci` com cache de dependências;
- Validação do título do PR (Conventional Commits);
- Execução dos testes (`npm test`) com relatório de cobertura;
- Análise de dependências (Dependabot / `npm audit`).

### 5.2 Política de Pull Request e Revisão

- Todo PR exige **1 aprovação** do par de revisão;
- Aprovações são descartadas quando novos commits são enviados;
- PRs pequenos, com o template preenchido;
- Merge somente com o pipeline de CI verde (a partir da Aula 2).

### 5.3 Critérios de Qualidade (Quality Gate)

- Todos os testes passando;
- Cobertura de linhas ≥ 80% em `src/`;
- Nenhuma vulnerabilidade alta ou crítica em dependências de produção.

## 6. Entrega e Implantação Contínua (CD)

### 6.1 Etapas do Pipeline de CD

- Merge na `main` → cálculo da versão (SemVer) a partir do título do PR;
- Implantação automática no environment `staging`;
- Verificação de saúde (`GET /saude`);
- **Aprovação manual do Desenvolvedor Líder** no environment `production`;
- Implantação em produção e geração da tag `vX.Y.Z` com notas de versão.

### 6.2 Rollback e Recuperação

Reimplantar a tag anterior por meio de workflow manual (Actions → Run workflow), ou
reverter o commit via PR.

## 7. Infraestrutura como Código

Não há infraestrutura própria. Ainda assim, toda configuração (workflows, `.nvmrc`,
`.env.example`) é versionada e alterada apenas por PR, nunca manualmente.

## 8. Controle de Configuração e Mudança

### 8.1 Processo de Solicitação de Mudança

Issue → branch `feature/...` → PR → revisão pelo par → CI → squash merge → CD.
Esse fluxo é o registro formal e rastreável da mudança.

### 8.2 Comitê de Controle de Mudança (CCM)

Composto pelo Desenvolvedor Líder e pelo par de revisão. Acionado apenas para mudanças de
alto risco: dados pessoais (LGPD), exceções ao fluxo padrão (hotfix) ou remoção de
funcionalidades. A decisão é registrada na Issue.

## 9. Baselines e Releases

Cada implantação bem-sucedida em produção gera uma **baseline**: tag SemVer associada ao
commit, com notas de versão geradas a partir dos Conventional Commits.

## 10. Status da Configuração

- Histórico de commits, PRs, revisões e execuções do GitHub Actions como base de auditoria;
- Métricas acompanhadas: **frequência de implantação** e **taxa de falha de mudanças**.

## 11. Marcos

| Marco                                                              | Aula |
| ------------------------------------------------------------------ | ---- |
| Repositório organizado, `main` protegida, par de revisão, environments | 1 |
| Pipeline de CI                                                     | 2    |
| CD com staging, aprovação, baseline e rollback                     | 3    |
| Governança: dependências, mudanças de alto risco, rastreabilidade  | 4    |

## 12. Treinamento e Recursos

O `README.md` funciona como guia de onboarding (instalar, rodar, testar e contribuir).
Decisões técnicas relevantes serão registradas como ADRs em `docs/`.

## 13. Dependências de Terceiros

Bibliotecas de código aberto versionadas pelo `package-lock.json`, com versões exatas no
`package.json`. Atualizações passam pelo mesmo fluxo de PR, revisão e pipeline.

## 14. Quadro-Resumo do Pipeline

| Etapa           | Descrição                                   | Gatilho                     |
| --------------- | ------------------------------------------- | --------------------------- |
| CI              | Testes, título do PR, análise de dependências | Abertura/atualização de PR |
| Merge           | Squash na `main`                            | 1 aprovação + CI verde      |
| CD — Staging    | Implantação automática                      | Merge na `main`             |
| Gate de release | Aprovação do Desenvolvedor Líder            | Sucesso em staging          |
| CD — Produção   | Implantação + tag `vX.Y.Z`                  | Aprovação no `production`   |
