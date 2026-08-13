const Users = require('../models/users');

const findAllUsers = async () => {
  return await Users.findAll({
    attributes: { exclude: ['password'] },
  });
};

const findUserById = async id => {
  return await Users.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
};

const findUserByEmail = async (email, password) => {
  return await Users.findOne({ where: { email } });
};

const createUser = async newUser => {
  return await newUser.save();
};
module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
};
