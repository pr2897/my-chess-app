const express = require('express');
const chessRoute = require('./chess.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/chess',
    route: chessRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
