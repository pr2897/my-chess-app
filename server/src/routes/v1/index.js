import express from 'express';
import config from '../../config/config.js';

import chessRoute from './chess.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/game',
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

export default router;
