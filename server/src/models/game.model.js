import mongoose from 'mongoose';

const moveSchema = mongoose.Schema(
  {
    color: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    flags: { type: String, required: true },
    piece: { type: String, required: true },
    san: { type: String, required: true },
  },
  { _id: false }
);

const gameSchema = mongoose.Schema(
  {
    player1: {
      type: String,
      required: true,
      trim: true,
    },

    player2: {
      type: String,
      required: true,
      trim: true,
    },

    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    fen: {
      type: String,
      required: true,
      trim: true,
    },

    moveHistory: {
      type: [moveSchema],
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
