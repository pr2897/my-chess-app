import express from 'express';
import chessController from '../../controllers/chess.controller.js';

const router = express.Router();

router.get('/', chessController.helloWorld);

export default router;
