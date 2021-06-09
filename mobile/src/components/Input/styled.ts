import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const View = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 18px;

  border-bottom-width: 2px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #e53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #20a6ff;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlap-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
