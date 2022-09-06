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
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    player2: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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

export default mongoose.model('Game', gameSchema);
