import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import { generateAccessToken } from '../middlewares/auth.middleware.js';
import { validatePageAndLimit } from '../common/utils.js';

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  try {
    const { currentPage, perPage } = validatePageAndLimit(
      req.query.page,
      req.query.limit
    );

    // Calculate the total number of users
    const totalUser = await prisma.user.count();
    const totalPages = Math.ceil(totalUser / perPage);

    // Calculate the number of items to skip
    const offset = (currentPage - 1) * perPage;

    const users = await prisma.user.findMany({
      skip: offset,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    responseHandler.ok(res, {
      currentPage,
      totalPages,
      data: users,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return responseHandler.notFound(res, `Not found User with Id: ${id}`);

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      ...req.body,
    });

    responseHandler.created(res, newUser);
  } catch (error) {
    responseHandler.error(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // check if user exist
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return responseHandler.notFound(res, `Not found User with Id: ${id}`);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    responseHandler.ok(res, updatedUser);
  } catch (error) {
    responseHandler.error(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // check if user exist
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return responseHandler.notFound(res, `Not found User with Id: ${id}`);

    await prisma.user.delete({
      where: {
        id,
      },
    });

    responseHandler.ok(res, 'User deleted successfully');
  } catch (error) {
    responseHandler.error(res);
  }
};

const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const isUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (isUser)
      return responseHandler.badRequest(res, 'Username already exists!!!');

    const isEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isEmail)
      return responseHandler.badRequest(res, 'Email already exists!!!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    responseHandler.created(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user)
      return responseHandler.notFound(res, 'Incorrect Username or Password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return responseHandler.notFound(res, 'Incorrect Username or Password');

    // Generate a JWT for the new user
    const accessToken = generateAccessToken(user.id, user.roleIds);

    responseHandler.ok(res, { accessToken, user });
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signUp,
  signIn,
};
