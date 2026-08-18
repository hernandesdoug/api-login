import { Sequelize } from 'sequelize';
import 'dotenv/config';

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;

if (!databaseName || !databaseUser || !databasePassword || !databaseHost) {
  throw new Error('Variáveis de ambiente do banco de dados não configuradas');
}
export const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  dialect: 'mysql',
  host: databaseHost,
  port: Number(process.env.DATABASE_PORT),
});
