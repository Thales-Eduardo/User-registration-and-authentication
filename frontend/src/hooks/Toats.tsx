import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToostContaienr';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string | object;
}

interface ToastOnTextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastOnTextData>({} as ToastOnTextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  ); // para adicionar um caixa de mensagem

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []); // para remover a caixa de testo pelo id

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastOnTextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser usado somente dentro do ToastProvider');
  }
  return context;
} // para dar acesso aos metodos addToast e removeToast

export { ToastProvider, useToast };
