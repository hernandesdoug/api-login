const userService = require('../services/user.services');
const appError = require('../errors/app.error');

const getAllUsers = async (request, response) => {
  const result = await userService.getAllUsers();
  if (!result) throw new appError('Users not found', 404);
  return response.json(result);
};

const getUserById = async (request, response) => {
  const id = request.params.id;
  const result = await userService.getUserById(id);
  if (!result) throw new appError('User not found', 404);
  response.json(result);
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) throw new appError('Email and password are required!', 401);

  const result = await userService.loginUser(email, password);

  return response.json(result);
};

const createUser = async (request, response) => {
  const newUser = request.body;
  const result = await userService.createUser(newUser);
  return response.json(result);
};

const updateUser = async (request, response) => {
    const id = request.params.id;
    const { fullName, email, dateBirth, phoneNumber, nationality, documentType } = request.body;

    const user = await Users.findByPk(id);
    if (!user) 
    const updatedData = { fullName, email, dateBirth, phoneNumber, nationality, documentType };

    await user.update(updatedData);

    response.status(200).json({
      message: 'User updated successfully',
      type: 'success',
    });  
};

const deleteUser = async (request, response) => {
   const id = request.params.id;
    const result = await Users.destroy({
      where: { id },
    });
    if (result === 0) 
    response.status(200).json({
      message: 'User deleted successfully',
      type: 'success',
    });
 
};

const updatePassword = async (request, response) => {
    const { id } = request.user;
    const { password } = request.body;
    const user = await Users.findByPk(id);
    if (!user) 
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });
    response.status(200).json({
      message: 'Password updated successfully',
      type: 'success',
    });
};

const logoutUser = async (request, response) => {};
module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  logoutUser,
};
