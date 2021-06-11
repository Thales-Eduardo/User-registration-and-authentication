import User from '../infra/typeorm/model/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(User: User): Promise<User>;
}

//metodos do repository

// encontrar usuário por id = findById()
// encontrar usuário por email = findByEmail()
// criar e savar usuário = create()
// atualizar os dados do usuário = save()
// deletar usuário
