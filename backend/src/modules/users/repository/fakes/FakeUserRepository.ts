import { v4 as uuid } from 'uuid';
import IUsersRepository from '../IUserRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/typeorm/model/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findUser] = user;
    return user;
  }
}

export default FakeUsersRepository;
