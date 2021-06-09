import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 30px;
  font-family: 'MateSC-Regular';
  margin: 30px 0 84px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TouchableOpacityText = styled.Text`
  color: #fff;
  font-size: 22px;
  font-family: 'MateSC-Regular';
  margin-left: 16px;
`;
