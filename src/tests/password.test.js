require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const Users = require('../models/users');
const sequelize = require('../config/database');
const createTestUser = require('./helpers/createUser');
const createToken = require('./helpers/auth');

describe('PUT /users/password', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });
  beforeEach(async () => {
    await Users.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve retornar erro quando senha não for enviada', async () => {
    const user = await createTestUser();
    const token = createToken(user.id);
    const response = await request(app)
      .put('/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });
  it('atualizar senha com sucesso', async () => {
    const user = await createTestUser();
    const token = createToken(user.id);
    const response = await request(app)
      .put('/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'NovaSenha123' });

    expect(response.statusCode).toBe(200);
  });
});
