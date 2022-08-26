const express = require('express');
const chessController = require('../../controllers/chess.controller');

const router = express.Router();

router.get('/', chessController.helloWorld);

module.exports = router;
