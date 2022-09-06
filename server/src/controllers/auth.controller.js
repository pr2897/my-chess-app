import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../models/index.js';
import { ApiError, catchAsync } from '../utils/index.js';

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, photo } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    photo,
  });

  const token = getToken(newUser._id);

  res.status(201).json({
    status: 'success',
    message: 'user signed up!',
    token,
    data: {
      user: newUser,
    },
  });
  next();
});

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) return next(new ApiError(400, 'Please Provide email & password'));

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ApiError(401, 'Incorrect Email or Password!'));
  }

  // 3) if everything is ok, send token to the client
  const token = getToken(user._id);

  res.status(200).json({ status: 'success', message: 'signed in', token, user });
  next();
});

const isAuth = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if its there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token) return next(new ApiError(401, 'Restricted Access. Please Login!'));

  // 2) validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new ApiError(401, 'The user belonging to this token, no longer exists!'));

  // 4) check if user changed password after JWT was issued
  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(new ApiError(401, 'User recently changed Password,Please login again!'));

  // Grant Access to Proteced Routes
  req.user = freshUser;

  next();
});

const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    console.log(roles, `[${req.user.role}]`);
    // roles ['admin','lead-guide']
    if (!roles.includes(req.user.role)) {
      console.log('I am here');
      return next(new ApiError(403, 'You do not have permission to perform this action'));
    } else next();
  });
};

export default {
  signup,
  signin,
  isAuth,
  restrictTo,
};
