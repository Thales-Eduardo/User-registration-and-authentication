import styled from 'styled-components';

export const Container = styled.button`
  margin-top: 60px;
  background: ${(props) => props.theme.colors.backgroundButton};
  color: ${(props) => props.theme.colors.colorButton};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
