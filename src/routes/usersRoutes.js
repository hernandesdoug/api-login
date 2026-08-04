const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
} = require("../controllers/usersController");

const usersRoutes = express.Router();
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login do usuário
 *     description: Autentica usuário e retorna token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
usersRoutes.post("/users/login", loginUser);
/**
 * @swagger
* /users:
 *   post:
 *     summary: Cadastro do usuario
 *     description: cadastra usuario 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               phoneNumber:
 *                 type: string
 *                 example: +5511999999999
 *               nationality:
 *                 type: string
 *                 example: Brazil
 *               documentType:
 *                 type: string
 *                 example: CPF 
 *               dateBirth:
 *                  type: string
 *                  format: date
 *                  example: 1900-01-01           
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       400:
 *         description: campo obrigatorio
 *       409:
 *          description: usuario ja cadastrado
 */
usersRoutes.post("/users", createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna usuários cadastrados sem exibir senha
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Token não informado
 */
usersRoutes.get("/users", authMiddleware, getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     description: Retorna usuário cadastrado sem exibir senha
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
usersRoutes.get("/users/:id", authMiddleware, getUserById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados do usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               phoneNumber:
 *                 type: string
 *                 example: +5511999999999
 *               nationality:
 *                 type: string
 *                 example: Brazil
 *               documentType:
 *                 type: string
 *                 example: CPF 
 *               dateBirth:
 *                  type: string
 *                  format: date
 *                  example: 1900-01-01           
 *     description: Atualiza usuário cadastrado sem exibir senha
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
usersRoutes.put("/users/:id", authMiddleware, updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     description: Exclui usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
usersRoutes.delete("/users/:id", authMiddleware, deleteUser);
/**
 * @swagger
 * /users/password:
 *   put:
 *     summary: Atualiza a senha do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: NovaSenha123
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Senha não informada
 *       404:
 *         description: Usuário não encontrado
 */
usersRoutes.post("/users/password/:id", authMiddleware, updatePassword);

module.exports = usersRoutes;
