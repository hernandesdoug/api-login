const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT || 3333, () => {
  console.log('Servidor rodando');
});
