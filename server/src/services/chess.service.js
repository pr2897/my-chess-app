import mongoose from 'mongoose';
import crypto from 'crypto';
import { Chess } from 'chess.js';

import { Game } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = async ({ roomId, player1 }) => {
  const chess = new Chess();
  const game = await Game.create({ player1, roomId, fen: chess.fen(), moveHistory: [] });
  return { roomId: game.roomId };
};

const getCurrentPosition = async (roomId) => {
  const game = await Game.findOne({ roomId });
  if (!game) throw new ApiError(400, 'No Game Records found!');

  const chess = new Chess(game.fen);
  const position = chess.board();
  return position.reduce((acc, row) => {
    const rowItems = row.map((current) => {
      return current ? `${current.color}${current.type}` : '';
    });
    return [...acc, rowItems];
  }, []);
};

const move = async ({ roomId, from, to, promotion }) => {
  const game = await Game.findOne({ roomId });
  if (!game) throw new ApiError(400, 'No Game Records found!');

  const chess = new Chess(game.fen);

  const move = chess.move({ from, to, promotion });
  if (!move) throw new ApiError('400', 'Illegal Move!');

  // save move to DB
  const resp = await Game.findOneAndUpdate({ roomId }, { fen: chess.fen(), $push: { moveHistory: move } });

  // return response
  return { roomId, move };
};

const getMoveHistory = async (roomId) => {
  const game = await Game.findOne({ roomId });
  if (!game) throw new ApiError(400, 'No Game Records found!');

  return game.moveHistory;
};

const getTurn = async (roomId) => {
  const game = await Game.findOne({ roomId });
  if (!game) throw new ApiError(400, 'No Game Records found!');

  const chess = new Chess(game.fen);
  return chess.turn();
};

export default { createNewGame, getCurrentPosition, getMoveHistory, move, getTurn };
