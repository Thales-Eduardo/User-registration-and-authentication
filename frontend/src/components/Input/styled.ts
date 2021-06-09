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
  border-bottom: 2px solid #fff;

  & + div {
    margin-top: 24px;
  }

  ${(props) =>
    props.IsErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #20a6ff;
      border-color: #20a6ff;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #20a6ff;
    `}

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #f4ede8;
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
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
