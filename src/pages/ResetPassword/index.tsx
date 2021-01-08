import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Container, Content, Background, AnimationContainer,
} from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getVallidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  passwod_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup
          .string()
          .required('Senha obrigatória'),
        passwod_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Confirmação incorreta',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { password, passwod_confirmation } = data;
      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error();
      }

      await api.post('password/reset', {
        password,
        passwod_confirmation,
        token,
      });

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getVallidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Error ao resetar senha',
        description: 'Ocorreu um error ao tentar resetar sua senha, tente novamente',
      });
    }
  }, [addToast, history, location.search]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input name="password" type="password" placeholder="Nova senha" icon={FiLock} />
            <Input
              name="passwod_confirmation"
              type="password"
              placeholder="Confirmação da senha"
              icon={FiLock}
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
