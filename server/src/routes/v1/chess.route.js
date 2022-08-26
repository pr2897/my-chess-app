import express from 'express';
import chessController from '../../controllers/chess.controller.js';

const router = express.Router();

router.post('/', chessController.createNewGame);
router.get('/:gameId', chessController.getCurentStatus);

export default router;
