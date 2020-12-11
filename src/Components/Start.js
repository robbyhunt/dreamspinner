import React from 'react';
import logo from '../img/mandala.png';
import Styled from "@emotion/styled";

const Inner = Styled('div')`
  background-color: #0079a3;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300467f' fill-opacity='0.26'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(25px + 2vmin);
  color: #ffffff;
`;

const Title = Styled('div')`
  color: #00a8e3;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: 800ms;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 10px;
  text-transform: uppercase;
  letter-spacing: 5px;

  &:hover {
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 1));
    font-size: calc(30px + 2vmin);
  }
`;

const Tagline = Styled(Title)`
  color: #e6e6e6;
  font-size: calc(1px + 3vmin);
  text-transform: none;
  max-width: 550px;
  margin-bottom: 30px;

  &:hover {
    font-size: calc(3px + 3vmin);
  }
`;

const Subtitle = Styled(Title)`
  color: #00467f;
  font-size: calc(12px + 2vmin);
  cursor: pointer;

  &:hover {
    font-size: calc(15px + 2vmin);
  }
`;

const Logo = Styled('img')`
  height: 30vmin;
  min-height: 275px;
  pointer-events: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
  margin-bottom: 20px;
  animation: spin infinite 50s linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Start({onClick}) {
  return (
    <Inner>
      <Title>
        Dreamspinner
      </Title>
      <Tagline>
        A modern solo RPG and creative writing tool
      </Tagline>
      <Logo src={logo} alt="logo" />
      <Subtitle onClick={onClick}>
        Start
      </Subtitle>
    </Inner>
  );
}

export default Start;