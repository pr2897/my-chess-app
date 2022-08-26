import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../utils/catchAsync.js';
import { chessService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = catchAsync(async (req, res) => {
  const { player1, player2, from, to } = req.body;
  if (!(player1 && player2 && from && to)) throw new ApiError(400, `player1, player2, from & to are mandatory fields`);

  const roomId = uuidv4();
  const resp = await chessService.createNewGame({ roomId, player1, player2, from, to });

  return res.send({ status: 'success', data: resp });
});

const getCurentStatus = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) throw new ApiError(400, `roomId is mandatory fields`);

  const resp = await chessService.getCurrentPosition(roomId);
  return res.send({ status: 'success', data: resp });
});

const movePeice = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { from, to, promotion } = req.body;
  if (!(roomId && from && to)) throw new ApiError(400, `roomId, from and too are mandatory fields`);

  const resp = await chessService.move({ roomId, from, to, promotion });
  return res.send({ status: 'success', data: resp });
});

export default {
  createNewGame,
  getCurentStatus,
  movePeice,
};
