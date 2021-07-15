import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButtonn } from '../../components/Button/styled';

export const Scroll = styled.ScrollView``;

export const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 140 : 40}px;
`;

export const Header = styled.View`
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
  font-family: 'MateSC-Regular';
`;

export const BtsignOut = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 15px;
`;

export const NameUser = styled.Text`
  font-family: 'MateSC-Regular';
  color: #20a6ff;
  font-size: 22px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 30px;
  font-family: 'MateSC-Regular';
  text-align: center;
  margin: 24px 0 54px;
`;
