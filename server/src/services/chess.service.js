import mongoose from 'mongoose';
import crypto from 'crypto';
import { Chess } from 'chess.js';

import { Game } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const createOrJoinNewGame = async ({ roomId, player, type }) => {
  console.log({ roomId, player, type });
  if (type === 'create') {
    const chess = new Chess();
    const game = await Game.create({ player1: player, roomId, fen: chess.fen(), moveHistory: [] });
    return { roomId: game.roomId };
  } else if (type === 'join') {
    const gameWithRoomId = await Game.findOne({ roomId });
    if (!gameWithRoomId) throw new ApiError(400, 'No Such Room exists!');

    if (gameWithRoomId.player2) throw new ApiError(400, 'Room is Full. Please enter spectator mode to watch the live game.');

    await Game.findOneAndUpdate({ roomId }, { $set: { player2: player } });
    return { roomId: roomId };
  }
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

export default { createOrJoinNewGame, getCurrentPosition, getMoveHistory, move, getTurn };
