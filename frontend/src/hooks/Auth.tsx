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
    const token = localStorage.getItem('@Token');
    const user = localStorage.getItem('@User');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  }); // para ter acesso aos dados enviado do bd como user, email...

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('@Token', token);
    localStorage.setItem('@User', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []); // checara os dados com o bd e retornara reposta e salvar no localhost

  const signOut = useCallback(() => {
    localStorage.removeItem('@Token');
    localStorage.removeItem('@User');

    setData({} as AuthState);
  }, []); // para deslogar o user basta apagar o localstore

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem('@User', JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
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
