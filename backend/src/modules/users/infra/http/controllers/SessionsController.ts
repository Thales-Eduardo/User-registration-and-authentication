import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AuthenticateUserService';
import response from '@config/response';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const AutenticateUser = container.resolve(AutenticateUserService);

    const { user, token } = await AutenticateUser.execute({
      email,
      password,
    });

    return res.json({ user: response.render(user), token });
  }
}

export default SessionsController;
