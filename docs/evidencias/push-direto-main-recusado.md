# Evidência — recusa do push direto na `main`

**Data:** 09/11/2026
**Repositório:** nicolascsnt/lista-tarefas
**Seções do PGC:** 3.3 (branching) e 5.2 (política de Pull Request)

## Regra configurada

*Settings → Branches → Branch protection rule* para o padrão `main`:

- Require a pull request before merging — 1 aprovação obrigatória
- Dismiss stale pull request approvals when new commits are pushed
- Require linear history
- Do not allow bypassing the above settings (vale também para o administrador)

## Teste

Foi feito um commit local diretamente na `main` e enviado com `git push origin main`.

## Resultado — push recusado pelo GitHub

```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote:
remote: - Changes must be made through a pull request.
To https://github.com/nicolascsnt/lista-tarefas.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/nicolascsnt/lista-tarefas.git'
```

O commit de teste foi descartado. Este próprio arquivo entrou na `main` por Pull Request
aprovado pelo par de revisão, o que demonstra o fluxo exigido pelo PGC.
