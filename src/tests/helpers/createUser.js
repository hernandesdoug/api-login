const Users = require("../../models/users");
const bcrypt = require("bcrypt");

const createTestUser = async (data = {}) => {
    const passwordHash = await bcrypt.hash("senha1234", 10);

    return await Users.create({
        fullName: "Test User",
        email: "test@email.com",
        password: passwordHash,
        phoneNumber: "+5511999999999",
        nationality: "Brazil",
        documentType: "CPF",
        dateBirth: "1990-01-01",
        ...data
    });
};

module.exports = createTestUser;