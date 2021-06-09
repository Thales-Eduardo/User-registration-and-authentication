import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiChevronsRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toats';
import getValidationError from '../../utils/getValidationErrors';

import { Container, AnimationContainer } from './styled';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
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

        addToast({
          type: 'success',
          title: 'Bem-vindo!',
        });

        history.push('/dash');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const err = getValidationError(error);
          formRef.current?.setErrors(err);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>
        <Link to="/register">
          Criar conta
          <FiChevronsRight size={20} />
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default Login;
