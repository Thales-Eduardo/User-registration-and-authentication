import styled, { css } from 'styled-components';
import { theme } from '../../style/theme';

import Tooltip from '../tooltip';

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
  IsErrored: boolean;
}

export const Container = styled.div<ContainerPros>`
  background: transparent;
  padding: 16px;
  width: 100%;
  margin-top: 80px;

  color: #666360;
  border: 0;
  border-bottom: 2px solid ${theme.colors.color};

  & + div {
    margin-top: 24px;
  }

  ${(props) =>
    props.IsErrored &&
    css`
      border-color: ${theme.colors.backgroundError};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${theme.colors.backgroundButton};
      border-color: ${theme.colors.backgroundButton};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${theme.colors.backgroundButton};
    `}

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${theme.colors.color};

    &::placeholder {
      color: ${theme.colors.color};
    }
  }

  > svg {
    margin-right: 16px;
    color: white;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 9px;
  svg {
    margin: 0;
    cursor: pointer;
  }

  span {
    background: ${theme.colors.backgroundError};
    color: ${theme.colors.color};

    &::before {
      border-color: ${theme.colors.backgroundError} transparent;
    }
  }
`;
