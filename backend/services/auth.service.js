import User from '../models/User.model.js';
import AppError from '../utils/AppError.js';
import { ROLES, USER_APPLICATION_STATUS } from '../utils/constants.js';
import { buildAuthResponse } from './token.service.js';

export const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new AppError('Email already registered', 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: ROLES.USER,
    applicationStatus: USER_APPLICATION_STATUS.NONE,
  });

  return buildAuthResponse(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Account is deactivated', 403);
  }

  return buildAuthResponse(user);
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user.toSafeObject();
};
