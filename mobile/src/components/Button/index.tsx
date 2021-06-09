import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { RectButtonn, Text } from './styled';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <RectButtonn {...rest}>
      <Text>{children}</Text>
    </RectButtonn>
  );
};

export default Button;
