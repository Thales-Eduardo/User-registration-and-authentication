import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const ForgotPasswordEmail = container.resolve(ForgotPasswordEmailService);

    await ForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
