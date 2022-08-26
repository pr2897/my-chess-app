const { chess } = require('chess.js');

const Chess = new chess();

while (!chess.game_over()) {
  const moves = chess.moves();
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
console.log(chess.pgn());
