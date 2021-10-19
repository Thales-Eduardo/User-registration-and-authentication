import React, { createContext, useCallback, useState, useContext } from 'react';

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
  signIn(props: SingnInProps): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@User');
    const refreshToken = localStorage.getItem('@refreshToken');
    const token = localStorage.getItem('@Token');

    if (token && user && refreshToken) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
        refreshToken: JSON.parse(refreshToken),
      };
    }
    return {} as AuthState;
  }); // para ter acesso aos dados enviado do bd como user, email...

  const signIn = useCallback(async ({ email, password }) => {
    const res: any = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user, refreshToken } = res.data;

    localStorage.setItem('@Token', token);
    localStorage.setItem('@User', JSON.stringify(user));
    localStorage.setItem('@refreshToken', JSON.stringify(refreshToken));
    setData({ token, user, refreshToken });
  }, []); // checara os dados com o bd e retornara reposta e salvar no localhost

  const signOut = useCallback(() => {
    localStorage.removeItem('@Token');
    localStorage.removeItem('@User');
    localStorage.removeItem('@refreshToken');

    setData({} as AuthState);
  }, []); // para deslogar o user basta apagar o localstore

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
        refreshToken: data.refreshToken,
      });
      localStorage.setItem('@User', JSON.stringify(user));
    },
    [setData, data.token, data.refreshToken],
  );

  // refresh token
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    // eslint-disable-next-line func-names
    async function (error: any): Promise<any> {
      const accessToken = localStorage.getItem('@Token');
      const refreshToken: any = localStorage.getItem('@refreshToken');
      const dataToken = JSON.parse(refreshToken);

      if (error.response.status === 401 && accessToken) {
        const response: any = await api.post('/profile/refresh-token', {
          id: dataToken.id,
        });
        const { token } = response.data;
        localStorage.setItem('@Token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// essa função dara acesso a todos os metodos
// const {user, signIn, signOut} = useAuth()
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
