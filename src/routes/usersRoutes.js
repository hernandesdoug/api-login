const express = require("express");
const { getAllUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/usersController");

const usersRoutes = express.Router();

usersRoutes.get("/users", getAllUsers);
usersRoutes.get("/users/:id", getUserById);
usersRoutes.post("/users/login", loginUser);
usersRoutes.post("/users", createUser);
usersRoutes.put("/users/:id", updateUser);
usersRoutes.delete("/users/:id", deleteUser);

module.exports = usersRoutes;
