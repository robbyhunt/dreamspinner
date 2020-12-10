import React from 'react';
import logo from '../img/mandala.png';
import dice from '../img/dice.png'
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  max-height: 50px;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
`;

const Img = Styled('img')`
  max-height: 60px;
`;


function Header() {
  return (
    <Wrapper>
      <Img src={logo} alt="logo" />
      <Img src={dice} alt="dice" />
    </Wrapper>
  );
}

export default Header;
