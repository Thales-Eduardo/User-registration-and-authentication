import styled, { css } from 'styled-components';

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
  border-bottom: 2px solid ${(props) => props.theme.colors.color};

  & + div {
    margin-top: 24px;
  }

  ${(props) =>
    props.IsErrored &&
    css`
      border-color: ${props.theme.colors.backgroundError};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.backgroundButton};
      border-color: ${props.theme.colors.backgroundButton};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.backgroundButton};
    `}

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${(props) => props.theme.colors.color};

    &::placeholder {
      color: ${(props) => props.theme.colors.color};
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
    background: ${(props) => props.theme.colors.backgroundError};
    color: ${(props) => props.theme.colors.color};

    &::before {
      border-color: ${(props) => props.theme.colors.backgroundError} transparent;
    }
  }
`;
