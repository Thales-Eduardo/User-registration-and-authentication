import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiChevronsLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import api from '../../services/api';

import getValidationError from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toats';

import { Container, AnimationContainer } from './styled';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface LoginFormData {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório!'),
          email: yup
            .string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido'),
          password: yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api
          .post('/users', data)
          .then((success) => {
            if (success) {
              addToast({
                type: 'success',
                title: 'Cadastro Concluído!',
              });
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const err = getValidationError(error);
          formRef.current?.setErrors(err);
        }
        addToast({
          type: 'error',
          title: 'Erro no Cadastro!!',
          description:
            'Ocorreu um erro ao fazer o Cadastro, cheque as credenciais.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiChevronsLeft size={20} color="#20a6ff" />
          Voltar para login
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default Login;
