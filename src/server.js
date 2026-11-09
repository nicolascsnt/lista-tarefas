const { criarApp } = require('./app');

const porta = Number(process.env.PORT) || 3000;

criarApp().listen(porta, () => {
  console.log(`API de tarefas rodando em http://localhost:${porta}`);
});
