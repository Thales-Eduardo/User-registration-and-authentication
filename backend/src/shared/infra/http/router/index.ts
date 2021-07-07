import { Router } from 'express';

import SessionsRouter from '@modules/users/infra/http/routes/Sessions.routes';
import CreateUserRoutes from '@modules/users/infra/http/routes/CreateUser.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/Profile.routes';

const router = Router();

router.use('/sessions', SessionsRouter);
router.use('/users', CreateUserRoutes);
router.use('/password', passwordRoutes);
router.use('/profile', ProfileRoutes);
export default router;
