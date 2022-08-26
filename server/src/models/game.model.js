import mongoose from 'mongoose';

const moveSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
});

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
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
