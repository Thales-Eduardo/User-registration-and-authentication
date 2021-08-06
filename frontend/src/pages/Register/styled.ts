import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-70px)
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

    width: 400px;
    height: 480px;

    @media (max-width: 400px) {
      width: 300px;
      height: 480px;
    }
  }

  a {
    color: ${(props) => props.theme.colors.color};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: brightness(0.2);
    }

    display: flex;
    align-items: center;

    > svg {
      margin-right: 5px;
    }

    &:hover {
      color: brightness(0.2);
    }
  }
`;
