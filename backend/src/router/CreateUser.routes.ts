import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import response from '../config/response';

const CreateUserRoutes = Router();

CreateUserRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const CreateUser = new CreateUserService();

  const newUser = await CreateUser.execute({
    name,
    email,
    password,
  });

  return res.json({ user: response.render(newUser) });
});

export default CreateUserRoutes;
