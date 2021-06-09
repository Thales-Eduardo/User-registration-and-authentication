import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 50px;
    font-size: 34px;
  }

  button {
    height: 40px;
    width: 110px;
    background: red;
    color: white;
  }
`;
