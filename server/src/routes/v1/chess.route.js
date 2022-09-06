import express from 'express';
import { chessController, authController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', authController.isAuth, chessController.getUserGameInfo);
router.post('/', authController.isAuth, chessController.createOrJoinNewGame);

router.get('/:roomId', authController.isAuth, chessController.getRoomInfo);
router.patch('/:roomId', authController.isAuth, chessController.movePeice);

export default router;
