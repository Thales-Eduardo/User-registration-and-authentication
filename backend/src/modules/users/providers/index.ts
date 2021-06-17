import { container } from 'tsyringe';

import BCryptjsHashProvider from './HashProvider/implementations/BCryptjsHashProvider';
import HashProvider from './HashProvider/methods/HashProvider';

container.registerSingleton<HashProvider>('HashProvider', BCryptjsHashProvider);
