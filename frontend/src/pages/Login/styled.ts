import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { theme } from '../../style/theme';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(80px)
  }
  to{
    opacity: 1;
    transform: translateY(0)
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed ${theme.colors.color};
    padding: 10px;

    width: 350px;
    height: 450px;
  }

  a {
    color: ${theme.colors.color};
    display: block;
    margin-top: 26px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, `${theme.colors.color}`)};
    }

    display: flex;
    align-items: center;

    > svg {
      margin-left: 5px;
    }

    &:hover {
      color: ${shade(0.2, `${theme.colors.color}`)};
    }
  }
`;
