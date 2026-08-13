const usersRepository = require('../repository/users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
  const users = await usersRepository.findAllUsers();
  return users;
};
const getUserById = async id => {
  const user = await usersRepository.findUserById(id);
  return user;
};
const loginUser = async (email, password) => {
  const user = await usersRepository.findUserByEmail(email, password);

  if (!user) throw new appError('Email and password are required!', 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new appError('Email and password are required!', 401);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
  return { user, token };
};
const createUser = async userData => {
  const { fullName, email, dateBirth, phoneNumber, password, nationality, documentType } = userData;

  const existingUser = await usersRepository.findUserByEmail(email);
  if (existingUser) throw new appError('Email already registered!', 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Users({
    fullName,
    email,
    dateBirth,
    phoneNumber,
    password: hashedPassword,
    nationality,
    documentType,
  });
  const newUser = await usersRepository.createUser(user);
  return newUser;
};
module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
};
