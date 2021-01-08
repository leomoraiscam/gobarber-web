import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { parseISO } from 'date-fns/esm';
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
import 'react-day-picker/lib/style.css';
import api from '../../services/api';

interface CallendarModifiers extends DayModifiers {
  available: boolean;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailiability, setMonthAvailiability] = useState<
  MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        month: currentMonth.getMonth() + 1,
        year: currentMonth.getFullYear(),
      },
    }).then((response) => {
      setMonthAvailiability(response.data);
    });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Appointment[]>('appointments/me', {
      params: {
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      },
    }).then((response) => {
      const appointmentsFormated = response.data.map((appointment) => ({
        ...appointment,
        hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
      }));

      setAppointments(appointmentsFormated);
    });
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: CallendarModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disableDays = useMemo(() => {
    const dates = monthAvailiability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailiability]);

  const setelectedDateAsText = useMemo(() => format(selectedDate, "'Dia' dd 'de' MMMM", {
    locale: ptBR,
  }), [selectedDate]);

  const selectedWeekDay = useMemo(() => format(selectedDate, 'cccc', {
    locale: ptBR,
  }), [selectedDate]);

  const morningAppointments = useMemo(() => appointments.filter(
    (appointment) => parseISO(appointment.date).getHours() < 12,
  ), [appointments]);

  const afternoonAppointments = useMemo(() => appointments.filter(
    (appointment) => parseISO(appointment.date).getHours() >= 12,
  ), [appointments]);

  const nextAppointmnet = useMemo(() => appointments.find(
    (appointment) => isAfter(parseISO(appointment.date), new Date()),
  ), [appointments]);

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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{setelectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointmnet && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointmnet.user.avatar_url || 'https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4'}
                  alt={nextAppointmnet.user.name}
                />

                <strong>{nextAppointmnet.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointmnet.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url ? appointment.user.avatar_url : 'https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4'}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (

              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url ? appointment.user.avatar_url : 'https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4'}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Callendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[
              { daysOfWeek: [0, 6] },
              ...disableDays,
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Callendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
