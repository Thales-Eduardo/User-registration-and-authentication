import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styled';
import { ToastMessage } from '../../hooks/Toats';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0, transition: '0.2s' },
      enter: { right: '0%', opacity: 1, transition: '0.2s' },
      leave: { right: '-120%', opacity: 0, transition: '0.2s' },
    },
  );

  return (
    <>
      <Container>
        {messageWithTransitions.map(({ item, key, props }) => (
          <Toast key={key} style={props} messages={item} />
        ))}
      </Container>
    </>
  );
};

export default ToastContainer;
