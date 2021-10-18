import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenUserService from '@modules/users/services/RefreshTokenUserService';

class RefreshTokenUserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const refreshTokenUser = container.resolve(RefreshTokenUserService);

    const token = await refreshTokenUser.execute(id);

    return res.json({ token });
  }
}

export default RefreshTokenUserController;
