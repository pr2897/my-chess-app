import mongoose from 'mongoose';
import crypto from 'crypto';
import { Chess } from 'chess.js';

import { Game } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const createNewGame = async ({ gameId, player1, player2, from, to }) => {
  const chess = new Chess();
  const move = chess.move({ from, to });
  if (!move) throw new ApiError(400, 'Illegal Move');

  const session = await mongoose.startSession();
  await session
    .withTransaction(async () => {
      const game = await Game.create([{ player1, player2, gameId, fen: chess.fen() }], { session });
    })
    .catch((err) => {
      throw new ApiError(400, err.message);
    })
    .finally(() => {
      session.endSession();
    });

  return move;
};

const getCurrentPosition = async (gameId) => {
  const game = await Game.findOne({ gameId });
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

const movePeice = ({ userId, from, to, promotion }) => {
  const move = chess.move({ from, to, promotion });
  if (!move) throw new ApiError('400', 'Illegal Move!');

  // save move to DB

  // return response
  return move;
};

const getMoveHistory = (gameId) => {
  const game = chess;
};

const getTurn = (userId) => {
  return chess.turn();
};

export default { createNewGame, getCurrentPosition, movePeice, getTurn };
