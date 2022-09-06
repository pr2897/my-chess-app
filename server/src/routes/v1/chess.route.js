import express from 'express';
import { chessController, authController } from '../../controllers/index.js';

const router = express.Router();

router.post('/', authController.isAuth, chessController.createNewGame);

// router.get('/:roomId', authController.isAuth, chessController.getRoomInfo);
// router.patch('/:roomId', authController.isAuth, chessController.movePeice);

// router.get('/:roomId/history', authController.isAuth, chessController.getHistoryByRoomId);
// router.get('/:roomId', authController.isAuth, chessController.getCurentStatus);

export default router;
