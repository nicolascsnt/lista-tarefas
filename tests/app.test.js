const request = require('supertest');
const { criarApp } = require('../src/app');

describe('API de tarefas', () => {
  let app;

  beforeEach(() => {
    app = criarApp();
  });

  test('GET /saude responde ok', async () => {
    const res = await request(app).get('/saude');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('cria e lista tarefas', async () => {
    const criada = await request(app).post('/tarefas').send({ titulo: 'Estudar GCS' });
    expect(criada.status).toBe(201);
    expect(criada.body).toMatchObject({ id: 1, titulo: 'Estudar GCS', concluida: false });

    const lista = await request(app).get('/tarefas');
    expect(lista.body).toHaveLength(1);
  });

  test('recusa tarefa sem título', async () => {
    const res = await request(app).post('/tarefas').send({ titulo: '   ' });
    expect(res.status).toBe(400);
  });

  test('conclui uma tarefa', async () => {
    await request(app).post('/tarefas').send({ titulo: 'Proteger a main' });
    const res = await request(app).patch('/tarefas/1/concluir');
    expect(res.status).toBe(200);
    expect(res.body.concluida).toBe(true);
  });

  test('remove uma tarefa e retorna 404 para inexistente', async () => {
    await request(app).post('/tarefas').send({ titulo: 'Criar environments' });
    expect((await request(app).delete('/tarefas/1')).status).toBe(204);
    expect((await request(app).delete('/tarefas/1')).status).toBe(404);
  });
});
