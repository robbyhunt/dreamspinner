import React from 'react';
import logo from '../img/mandala.png';
import dice from '../img/dice.png'
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #ffffff;
  height: ${props => props.startOpen ? "80px" : "0px"};
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
  transition: 200ms;
`;

const Img = Styled('img')`
  height: ${props => props.startOpen ? "60px" : "0px"};
  transition: 200ms;
`;

function Header({startOpen}) {
  return (
    <Wrapper startOpen={startOpen}>
      <Img src={logo} alt="logo" startOpen={startOpen}/>
      <Img src={dice} alt="dice" startOpen={startOpen}/>
    </Wrapper>
  );
}

export default Header;
