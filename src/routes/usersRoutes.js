const express = require("express");
const authMiddleware = require("../utils/authMiddleware");
const { getAllUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/usersController");

const usersRoutes = express.Router();

usersRoutes.post("/users/login", loginUser);
usersRoutes.post("/users", createUser);
usersRoutes.get("/users", authMiddleware, getAllUsers);
usersRoutes.get("/users/:id", authMiddleware, getUserById);
usersRoutes.put("/users/:id", authMiddleware, updateUser);
usersRoutes.delete("/users/:id", authMiddleware, deleteUser);

module.exports = usersRoutes;
