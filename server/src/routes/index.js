import express from 'express';
import userRoute from './user.route.js';
import tourRoute from './tour.route.js';

const router = express.Router({ mergeParams: true });

router.use('/users', userRoute);

router.use('/tours', tourRoute);

export default router;
