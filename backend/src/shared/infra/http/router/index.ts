import { Router } from 'express';

import SessionsRouter from '@modules/users/infra/http/routes/Sessions.routes';
import CreateUserRoutes from '@modules/users/infra/http/routes/CreateUser.routes';

const router = Router();

router.use('/sessions', SessionsRouter);
router.use('/users', CreateUserRoutes);

export default router;
