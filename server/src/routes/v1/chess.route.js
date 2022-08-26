import express from 'express';
import chessController from '../../controllers/chess.controller.js';

const router = express.Router();

router.post('/', chessController.createNewGame);
router.get('/:roomId', chessController.getCurentStatus);
router.patch('/:roomId', chessController.movePeice);

export default router;
