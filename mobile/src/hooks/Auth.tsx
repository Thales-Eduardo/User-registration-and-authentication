import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface AuthState {
  user: object;
  token: string;
}

interface SingnInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(props: SingnInProps): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Gobaber:token',
        '@Gobaber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setloading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const reponse = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = reponse.data;

    await AsyncStorage.multiSet([
      ['@Gobaber:token', token],
      ['@Gobaber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobaber:token', '@Gobaber:user']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado somente em um usúario autenticado');
  }
  return context;
}
// essa função dara acesso a todos os metodos
// const {user, signIn, signOut} = useAuth()
