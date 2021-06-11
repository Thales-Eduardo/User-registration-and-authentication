import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/model/User';
import MsgError from '@shared/errors/MsgError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new MsgError('Esse email já existe');
    }

    const hashPassword = await hash(password, 8);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(newUser);

    return newUser;
  }
}
export default CreateUserService;
