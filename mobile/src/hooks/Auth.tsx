import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User;
  token: string;
  refreshToken: any;
}

interface SingnInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(props: SingnInProps): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user, refreshToken] = await AsyncStorage.multiGet([
        '@Token',
        '@User',
        '@RefreshToken',
      ]);

      if (token[1] && user[1] && refreshToken[1]) {
        api.defaults.headers.common.authorization = `Bearer ${token[1]}`;
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          refreshToken: JSON.parse(refreshToken[1]),
        });
      }
      setloading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const reponse: any = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user, refreshToken } = reponse.data;

    await AsyncStorage.multiSet([
      ['@Token', token],
      ['@User', JSON.stringify(user)],
      ['@RefreshToken', JSON.stringify(refreshToken)],
    ]);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setData({ token, user, refreshToken });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Token', '@User', '@RefreshToken']);
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@User', JSON.stringify(user));
      setData({
        token: data.token,
        user,
        refreshToken: data.refreshToken,
      });
    },
    [setData, data.token],
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    // eslint-disable-next-line func-names
    async function (error: any): Promise<any> {
      const [token, refreshToken]: any = await AsyncStorage.multiGet([
        '@Token',
        '@RefreshToken',
      ]);

      const dataRefresh = JSON.parse(refreshToken[1]);

      if (error.response.status === 401 && token) {
        const response: any = await api.post('/profile/refresh-token', {
          id: dataRefresh.id,
        });
        const { token } = response.data;
        await AsyncStorage.setItem('@Token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
// essa função dara acesso a todos os metodos
// const {user, signIn, signOut} = useAuth()
