import { v4 as uuidv4 } from 'uuid';
import jsonwebtoken from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import { chessService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import { Game } from '../models/index.js';

const createOrJoinNewGame = catchAsync(async (req, res) => {
  const { type } = req.body;
  let resp = null;

  if (type === 'create') {
    const roomId = uuidv4();
    resp = await chessService.createOrJoinNewGame({ roomId, player: req.user._id, type: 'create' });
  } else if (type === 'join') {
    const { roomId } = req.body;
    resp = await chessService.createOrJoinNewGame({ roomId, player: req.user._id, type: 'join' });
  }

  return res.send(resp);
});

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

const getUserGameInfo = catchAsync(async (req, res) => {
  const listOfPastRooms = await Game.find(
    { $or: [{ player1: req.user._id }, { player2: req.user._id }] },
    { roomId: 1, _id: 0, player1: 1, player2: 1, updatedAt: 1, createdAt: 1 }
  );

  return res.send({ listOfPastRooms });
});

export default {
  createOrJoinNewGame,
  movePeice,
  getRoomInfo,
  getUserGameInfo,
};
