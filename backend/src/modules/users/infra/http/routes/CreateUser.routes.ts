import { Router } from 'express';

import CreateUserController from '../controllers/CreateUserController';

const CreateUserRoutes = Router();
const createUserController = new CreateUserController();

CreateUserRoutes.post('/', createUserController.create);

export default CreateUserRoutes;
