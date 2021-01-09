import React, { useCallback, useRef } from 'react';
import {
  FiMail, FiLock, FiUser, FiArrowLeft, FiCamera,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import {
  Container, Content, AvatarInput,
} from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getVallidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string,
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup
          .string()
          .min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'sucess',
        title: 'Cadastro realizado com sucesso!',
        description: 'Você já pode fazer seu logon no GoBarber',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getVallidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Error no cadastro',
        description: 'Ocorreu um error ao fazer cadastro, verifique os dados e tente novamente',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img
              src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
              alt="imagem de perfil"
            />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input containerStyle={{ marginTop: 24 }} name="old_password" type="password" placeholder="Senha atual" icon={FiLock} />
          <Input name="password" type="password" placeholder="Nova senha" icon={FiLock} />
          <Input name="password_confirmation" type="password" placeholder="Confirmar senha" icon={FiLock} />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Profile;
