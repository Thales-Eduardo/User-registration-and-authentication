import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiChevronsLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useToast } from '../../hooks/Toats';
import getValidationError from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, AnimationContainer } from './styled';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ForgotFormData {
  email: string;
}

const Forgot: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: '👍',
          description: 'Um e-mail foi enviado para sua conta',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const err = getValidationError(error);
          formRef.current?.setErrors(err);
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperar Senha!',
          description: 'Cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Button type="submit" loading={loading}>
            Recuperar Senha
          </Button>
        </Form>
        <Link to="/">
          <FiChevronsLeft size={20} />
          Fazer o login
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default Forgot;
