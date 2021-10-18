import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import RefreshTokenUserController from '../controllers/RefreshTokenUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();
const refreshTokenUserController = new RefreshTokenUserController();

profileRouter.put('/', ensureAuthenticated, profileController.update);

profileRouter.post('/refresh-token', refreshTokenUserController.update);

export default profileRouter;
