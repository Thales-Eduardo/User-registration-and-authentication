import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

const sessionsRouter = Router();
const profileController = new ProfileController();

sessionsRouter.post('/', profileController.update);

export default sessionsRouter;
