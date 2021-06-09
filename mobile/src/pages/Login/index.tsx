import React, { useCallback, useRef } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import Dash from '../Dash';

import {
  ContainerView,
  Text,
  TouchableOpacity,
  TouchableOpacityText,
} from './styled';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleLogin = useCallback(async (data: LoginFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        email: yup
          .string()
          .required('E-mail obrigatório!')
          .email('Digite um e-mail válido'),
        password: yup.string().required('Senha obrigatório!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const err = getValidationError(error);
        formRef.current?.setErrors(err);
      }
      Alert.alert(
        'Error na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <ContainerView>
            <View>
              <Text>Faça seu login</Text>
            </View>

            <Form ref={formRef} onSubmit={handleLogin}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </ContainerView>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Icon name="log-in" size={20} color="#20a6ff" />
        <TouchableOpacityText>Criar conta</TouchableOpacityText>
      </TouchableOpacity>
    </>
  );
};

export default Login;
