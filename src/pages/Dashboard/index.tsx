import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Callendar,
  Content,
  NextAppointment,
  Section,
  Appointment,
} from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="logo" />
          <Profile>
            <img
              src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
              alt="imagem de perfil"
            />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
                alt="Leonardo Morais"
              />

              <strong>Leonardo Morais</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
                  alt="Leonardo Morais"
                />

                <strong>Leonardo Morais</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
                  alt="Leonardo Morais"
                />

                <strong>Leonardo Morais</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4"
                  alt="Leonardo Morais"
                />

                <strong>Leonardo Morais</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Callendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
