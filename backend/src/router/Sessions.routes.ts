import { Router } from 'express';

import AutenticateUserService from '../services/AuthenticateUserService';
import response from '../config/response';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const AutenticateUser = new AutenticateUserService();

  const { user, token } = await AutenticateUser.execute({
    email,
    password,
  });

  return res.json({ user: response.render(user), token });
});

export default sessionsRouter;
