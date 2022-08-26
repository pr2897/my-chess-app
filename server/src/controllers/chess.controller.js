import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../utils/catchAsync.js';
import { chessService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = catchAsync(async (req, res) => {
  const { player1, player2, from, to } = req.body;
  if (!(player1 && player2 && from && to)) throw new ApiError(400, `player1, player2, from & to are mandatory fields`);

  const gameId = uuidv4();
  const resp = await chessService.createNewGame({ gameId, player1, player2, from, to });

  return res.send({ status: 'success', data: resp });
});

const getCurentStatus = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  if (!gameId) throw new ApiError(400, `gameId is mandatory fields`);

  const resp = await chessService.getCurrentPosition(gameId);
  return res.send({ status: 'success', data: resp });
});

export default {
  createNewGame,
  getCurentStatus,
};
