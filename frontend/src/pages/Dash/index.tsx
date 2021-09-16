import React, { useCallback, useRef } from 'react';
import { FiPower, FiUser, FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';
import api from '../../services/api';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toats';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Header, HeaderContent, Profile, Content } from './styled';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const Dash: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { signOut, user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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

        api
          .put('/profile', formData)
          .then((response) => {
            const { user } = response.data;
            updateUser(user);
            addToast({
              type: 'success',
              title: 'Perfil Atualizado!',
            });
          })
          .catch((err) => {
            if (err.response.status === 401) {
              signOut();
              addToast({
                type: 'info',
                title: 'Refaça o login novamente!',
              });
            }
          });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no update!',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
        });
      }
    },
    [addToast, updateUser, signOut],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="newPassword"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Dash;
