import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="Logo" />
      <form>
        <h1>Faça seu logon</h1>
        <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
        <Input name="password " type="password" placeholder="Senha" icon={FiLock} />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esquecir minha senha</a>
      </form>

      <a href="register">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
