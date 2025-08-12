const express = require("express");
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
        console.log(email);
        console.log(password);
        const user = await Users.findOne({where: {email: email}});
        console.log(user);
        if (!user) {
            return response.status(400).json({
                message: "User does not exist!", 
                type: "error"});
        }

        if (password !== user.password) {
            return response.status(400).json({
                message: "Incorrect Password",
                type: "error",
            });
        }
        return response.status(200).json({
            message: "Login Successfully!",
            type: "ok",
            })
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
