import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/Auth';

import { Container } from './styled';

const Dash: React.FC = () => {
  const { signOut } = useAuth();

  const handleButton = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <h1>sucesso</h1>

      <button onClick={handleButton} type="button">
        Sair
      </button>
    </Container>
  );
};

export default Dash;
