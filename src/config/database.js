const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  dialect: 'mysql',
  host: databaseHost,
  port: process.env.DATABASE_PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao MySQL com sucesso!');
    return sequelize.sync();
  })
  .catch(err => {
    console.error('Não foi possível conectar ao MySQL:', err);
  });
module.exports = sequelize;
