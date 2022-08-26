import catchAsync from '../utils/catchAsync.js';

const createNewGame = catchAsync(async (req, res, next) => {
  const { player1, player2, from, to } = req.body;

  next();
});

// const getUsers = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

// const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
// };

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

export default {
  createNewGame,
};
