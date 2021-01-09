import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  flex-direction: column;
  align-items: stretch;

  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;

      svg {
        color: #999591;
        size: 50px;
      }
    }

  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  form {
    margin: -120px 0px;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover{
        color: ${shade(0.2, '#f4ede8')}
      }
    }

    input[name='old_password'] {
      margin-top: 24px
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #FF9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')}
    }
  }
`;
