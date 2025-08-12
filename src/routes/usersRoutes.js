const { response } = require("express");
const express = require("express");
const sequelize = require("../models/sequelize");
const Users = require("../models/users");

const usersRoutes = express.Router();

usersRoutes.get("/users", async(request, response) => {
    const result = await Users.findAll();
    response.json(result);
});

usersRoutes.get("/users/:id", async(request, response) => {
    const id = request.params.id;
    const result = await Users.findOne({
        where: { id }
    });
    response.json(result);
});

usersRoutes.post("/users/login", async(request, response) => {
    try{
        const {email, password} = request.body;
        const user = await Users.findOne({where: email});

        if (!user) {
            return response.status(400).json({
                message: "User does not exist!", 
                type: "error"});
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({
                message: "Incorrect Password",
                type: "error",
            });
        }
        response.send("Login Successfully!")
    } catch (error) {
      response.status(500).json({
        message: "Login Failed!",
        type: "error",
    });
      }  
});

usersRoutes.post("/users", async(request, response) => {
    const body = request.body;
    const result = await Users.create(body);
    response.json(result);
});

usersRoutes.put("/users/:id", async(request, response) => {
    const id = request.params.id;
    const result = await Users.update(body, {
        where: { id }
    });
    response.json(result);
});

usersRoutes.delete("/users/:id", async (request, response) => {
    const id = request.params.id;
    const result = await Users.destroy({
        where: {id}
    });
    response.json(result);
});
module.exports = usersRoutes;
