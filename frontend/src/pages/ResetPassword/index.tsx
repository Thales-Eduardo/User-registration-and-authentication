import React, { useCallback, useRef } from 'react';
import { FiLock, FiChevronsRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';

import { useToast } from '../../hooks/Toats';
import getValidationError from '../../utils/getValidationErrors';

import { Container, AnimationContainer } from './styled';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface LoginFormData {
  passwordConfirmation: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          password: yup.string().required('Senha obrigatório!'),
          passwordConfirmation: yup
            .string()
            .oneOf(
              [yup.ref('password'), null],
              'Confirmação de senha incorreta.',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const err = getValidationError(error);
          formRef.current?.setErrors(err);
        }
        addToast({
          type: 'error',
          title: 'Erro erro ao resetar a senha cheque credenciais!',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar Senha</h1>
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação da senha"
          />
          <Button type="submit">Resetar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default ResetPassword;
