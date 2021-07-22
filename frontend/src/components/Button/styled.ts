import styled from 'styled-components';
import { shade } from 'polished';
import { theme } from '../../style/theme';

export const Container = styled.button`
  margin-top: 60px;
  background: ${theme.colors.backgroundButton};
  color: ${theme.colors.colorButton};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, `${theme.colors.backgroundButton}`)};
  }
`;
