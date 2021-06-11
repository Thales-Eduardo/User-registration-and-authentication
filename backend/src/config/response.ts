import User from '@modules/users/infra/typeorm/model/User';

export default {
  render(user: User) {
    return {
      name: user.name,
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
};
