import { Router } from 'express';

import sessionsRouter from './Sessions.routes';
import CreateUserRoutes from './CreateUser.routes';

const router = Router();

router.use('/sessions', sessionsRouter);
router.use('/users', CreateUserRoutes);

export default router;
