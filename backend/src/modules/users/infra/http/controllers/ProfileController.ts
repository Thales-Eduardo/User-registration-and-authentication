import { Request, Response } from 'express';
import { container } from 'tsyringe';
import response from '@config/response';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, oldPassword, newPassword } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: req.user.id,
      name,
      email,
      oldPassword,
      newPassword,
    });

    return res.json({ user: response.render(user) });
  }
}

export default ProfileController;
