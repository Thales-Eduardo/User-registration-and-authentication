import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './style';
import { ToastMessage, useToast } from '../../../hooks/Toats';

interface ToastProps {
  messages: ToastMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ messages, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(messages.id);
    }, 5500);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, messages.id]);

  return (
    <Container
      type={messages.type}
      hasDescription={!!messages.description}
      style={style}
    >
      {icons[messages.type || 'info']}
      <div>
        <strong>{messages.title}</strong>
        {messages.description && <p>{messages.description}</p>}
      </div>

      <button onClick={() => removeToast(messages.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
