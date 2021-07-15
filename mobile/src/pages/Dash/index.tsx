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
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  ContainerView,
  Text,
  Scroll,
  Header,
  Title,
  NameUser,
  BtsignOut,
} from './styled';

interface DashFormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const Dash: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldpasswordInputRef = useRef<TextInput>(null);
  const newpasswordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { user, updateUser, signOut } = useAuth();

  const handleLogin = useCallback(
    async (data: DashFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório!'),
          email: yup
            .string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido'),
          oldPassword: yup.string(),
          newPassword: yup.string().when('oldPassword', {
            is: (val: string | unknown[]) => !!val.length,
            then: yup.string().required('Campo obrigatório'),
            otherwise: yup.string(),
          }),
          passwordConfirmation: yup
            .string()
            .when('oldPassword', {
              is: (val: string | unknown[]) => !!val.length,
              then: yup.string().required('Campo obrigatório'),
              otherwise: yup.string(),
            })
            .oneOf(
              [yup.ref('newPassword'), null],
              'Confirmação de senha incorreta.',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, oldPassword, newPassword, passwordConfirmation } =
          data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                newPassword,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        const { user } = response.data;

        updateUser(user);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const err = getValidationError(error);
          formRef.current?.setErrors(err);
        }
        Alert.alert(
          'Erro ao atualizar perfil!',
          'Ocorreu um erro ao atualizar perfil, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <Scroll showsVerticalScrollIndicator={false}>
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
            <Header>
              <Title>Bem-vindo,</Title>
              <NameUser>{user.name}</NameUser>

              <BtsignOut onPress={signOut}>
                <Icon name="power" size={24} color="#fff" />
              </BtsignOut>
            </Header>

            <View>
              <Text>Meu perfil</Text>
            </View>

            <Form
              initialData={{ name: user.name, email: user.email }}
              ref={formRef}
              onSubmit={handleLogin}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldpasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldpasswordInputRef}
                name="oldPassword"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  newpasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={newpasswordInputRef}
                name="newPassword"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordConfirmationInputRef}
                name="passwordConfirmation"
                icon="lock"
                placeholder="Confimação da senha"
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
                Confirmar alterações
              </Button>
            </Form>
          </ContainerView>
        </ScrollView>
      </KeyboardAvoidingView>
    </Scroll>
  );
};

export default Dash;
