import mongoose from 'mongoose';
import crypto from 'crypto';
import { Chess } from 'chess.js';

import { Game } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = async ({ roomId, player1, player2, from, to }) => {
  const chess = new Chess();

  const move = chess.move({ from, to });
  if (!move) throw new ApiError(400, 'Illegal Move');

  const game = await Game.create({ player1, player2, roomId, fen: chess.fen() });
  return { roomId: game.roomId, move };
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
  const resp = await Game.findOneAndUpdate({ roomId }, { fen: chess.fen() });

  // return response
  return { roomId, move };
};

const getMoveHistory = (roomId) => {
  const game = chess;
};

const getTurn = (userId) => {
  return chess.turn();
};

export default { createNewGame, getCurrentPosition, move, getTurn };
