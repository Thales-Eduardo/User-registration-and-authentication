import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/model/User';
import MsgError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkEmailExists = await this.userRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new MsgError('Esse email já existe');
    }

    const hashPassword = await hash(password, 8);

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return newUser;
  }
}
export default CreateUserService;
