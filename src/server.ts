import { app } from './app.js';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 3333;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao MySQL com sucesso!');
    return sequelize.sync();
  })
  .catch((err: Error) => {
    console.error('Não foi possível conectar ao MySQL:', err);
    process.exit(1);
  });

app.listen(PORT || 3333, () => {
  console.log('Servidor rodando');
});
