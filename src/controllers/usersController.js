const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (request, response) => {
    try {
        const result = await Users.findAll({
            attributes: { exclude: ["password"] }
        });
        response.json(result);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};

const getUserById = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Users.findOne({
            where: { id },
            attributes: { exclude: ["password"] }
        });
        if (!result) {
            return response.status(404).json({
                message: "User not found",
                type: "error"
            })
        }
        response.json(result);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};

const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required!",
                type: "error"
            })
        }

        const user = await Users.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            console.log("Passou aqui?")
            return response.status(401).json({
                message: "Invalid email or password",
                type: "error"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("senha nao tem hash!")
            return response.status(401).json({
                message: "Invalid email or password",
                type: "error",
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );
        return response.status(200).json({
            message: "Login Successfully!",
            type: "success",
            token
        })
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};

const createUser = async (request, response) => {
    try {
        const { fullName, email, dateBirth, phoneNumber, password,
            cfPassword, nationality, documentType } = request.body;

        if (!fullName) {
            return response.status(400).json({
                message: "Please, enter with your full name!",
                type: "error",
            });
        }

        if (!email) {
            return response.status(400).json({
                message: "Please, enter with your email",
                type: "error",
            });
        }

        if (!dateBirth) {
            return response.status(400).json({
                message: "Please, enter with your date of birth",
                type: "error",
            });
        }

        if (!phoneNumber) {
            return response.status(400).json({
                message: "Please, enter with your phone Number",
                type: "error",
            });
        }

       /* if (password !== cfPassword) {
            return response.status(400).json({
                message: "Passwords Don't Match!",
                type: "error",
            });
        }*/

        if (!password) {
            return response.status(400).json({
                message: "Please, type your password",
                type: "error",
            });
        }

        if (!nationality) {
            return response.status(400).json({
                message: "Please, select your nationality",
                type: "error",
            });
        }

        if (!documentType) {
            return response.status(400).json({
                message: "Please, select a valid document type!",
                type: "error",
            });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return response.status(409).json({
                message: "Email already registered!",
                type: "error",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            fullName,
            email,
            dateBirth,
            phoneNumber,
            password: hashedPassword,
            nationality,
            documentType
        })
        await newUser.save();

        response.status(201).json({
            message: "User created successfully",
            type: "success",
        })

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};

const updateUser = async (request, response) => {
    try {
        const id = request.params.id;
        const { fullName, email, dateBirth, phoneNumber, password, nationality, documentType } = request.body;

        const user = await Users.findByPk(id);
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                type: "error"
            });
        }
        const updatedData = { fullName, email, dateBirth, phoneNumber, nationality, documentType };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updatedData);

        response.status(200).json({
            message: "User updated successfully",
            type: "success"
        })
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};

const deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Users.destroy({
            where: { id }
        });
        if (result === 0) {
            return response.status(404).json({
                message: "User not found",
                type: "error"
            });
        }
        response.status(200).json({
            message: "User deleted successfully",
            type: "success"
        })
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
};
module.exports = {
    getAllUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser
};
