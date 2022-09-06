import { v4 as uuidv4 } from 'uuid';
import jsonwebtoken from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import { chessService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = catchAsync(async (req, res) => {
  const roomId = uuidv4();
  const resp = await chessService.createNewGame({ roomId, player1: req.user._id });
  return res.send(resp);
});

const getCurentStatus = catchAsync(async (req, res) => {});

const movePeice = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { from, to, promotion } = req.body;
  if (!(roomId && from && to)) throw new ApiError(400, `roomId, from and too are mandatory fields`);

  const resp = await chessService.move({ roomId, from, to, promotion });
  return res.send({ status: 'success', data: resp });
});

const getRoomInfo = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { type } = req.query;
  if (!roomId) throw new ApiError(400, `roomId is mandatory fields`);

  let resp = null;
  if (type === 'currentStatus') resp = await chessService.getCurrentPosition(roomId);
  else if (type === 'history') resp = await chessService.getMoveHistory(roomId);

  return res.send({ status: 'success', data: resp });
});

const getHistoryByRoomId = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) throw new ApiError(400, `roomId is mandatory fields`);

  const resp = await chessService.getMoveHistory(roomId);
  return res.send({ status: 'success', data: resp });
});

export default {
  createNewGame,
  movePeice,
  getRoomInfo,
};
