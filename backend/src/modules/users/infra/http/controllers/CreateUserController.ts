import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import response from '@config/response';

class CreateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const CreateUser = container.resolve(CreateUserService);

    const newUser = await CreateUser.execute({
      name,
      email,
      password,
    });

    return res.json({ user: response.render(newUser) });
  }
}

export default CreateUserController;
