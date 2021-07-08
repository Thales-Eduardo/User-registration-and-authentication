import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #fff;
    height: 20px;
    width: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #20a6ff;
      margin-right: 5px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  width: 100%;

  form {
    margin: 40px 0px;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 14px;
      font-size: 24px;
      text-align: center;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;
