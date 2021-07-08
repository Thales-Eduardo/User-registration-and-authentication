import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);

export default profileRouter;
