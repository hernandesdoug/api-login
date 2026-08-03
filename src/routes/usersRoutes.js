const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
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
 *                 type: int
 *                 example: 11999999999
 *               nationality:
 *                 type: string
 *                 example: Brazil
 *               documentType:
 *                 type: string
 *                 example: CPF 
 *               dateBirth:
 *                  type: date
 *                  example: 01/01/1900           
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
usersRoutes.get("/users/:id", authMiddleware, getUserById);
usersRoutes.put("/users/:id", authMiddleware, updateUser);
usersRoutes.delete("/users/:id", authMiddleware, deleteUser);

module.exports = usersRoutes;
