import styled, { keyframes } from 'styled-components';

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
    border: 2px dashed ${(props) => props.theme.colors.color};
    padding: 10px;

    width: 350px;
    height: 450px;
  }

  a {
    color: ${(props) => props.theme.colors.color};
    display: block;
    margin-top: 26px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: brightness(0.2);
    }

    display: flex;
    align-items: center;

    > svg {
      margin-left: 5px;
    }

    &:hover {
      color: brightness(0.2);
    }
  }
`;
