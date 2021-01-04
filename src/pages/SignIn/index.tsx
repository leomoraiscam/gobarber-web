import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getVallidationErrors from '../../utils/getValidationErrors';
import AuthContext from '../../context/AuthContext';

interface DataLoginUser {
  email: string;
  password: string,
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const auth = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: DataLoginUser) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup
          .string()
          .required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getVallidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input name="password" type="password" placeholder="Senha" icon={FiLock} />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esquecir minha senha</a>
        </Form>

        <a href="register">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
