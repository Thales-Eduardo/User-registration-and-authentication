import { compare, hash } from 'bcryptjs';
import HashProvider from '../methods/HashProvider';

class BCryptjsHashProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptjsHashProvider;
