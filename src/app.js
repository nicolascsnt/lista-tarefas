const express = require('express');

function criarApp() {
  const app = express();
  app.use(express.json());

  const tarefas = [];
  let proximoId = 1;

  app.get('/saude', (req, res) => {
    res.json({ status: 'ok', ambiente: process.env.AMBIENTE || 'local' });
  });

  app.get('/tarefas', (req, res) => {
    res.json(tarefas);
  });

  app.post('/tarefas', (req, res) => {
    const { titulo } = req.body || {};
    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
      return res.status(400).json({ erro: 'O campo "titulo" é obrigatório.' });
    }
    const tarefa = { id: proximoId++, titulo: titulo.trim(), concluida: false };
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
  });

  app.patch('/tarefas/:id/concluir', (req, res) => {
    const tarefa = tarefas.find((t) => t.id === Number(req.params.id));
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    tarefa.concluida = true;
    res.json(tarefa);
  });

  app.delete('/tarefas/:id', (req, res) => {
    const indice = tarefas.findIndex((t) => t.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    tarefas.splice(indice, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = { criarApp };
