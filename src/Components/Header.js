import React from 'react';
import logo from '../img/mandala.png';
import dice from '../img/dice.png'
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.startOpen ? "20px" : "20px"};
  background-color: #ffffff;
  height: ${props => props.startOpen ? "50px" : "10px"};
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
  transition: 200ms;
`;

const Img = Styled('img')`
  height: ${props => props.startOpen ? "60px" : "40px"};
  transition: 200ms;
`;

const BackgroundButton = Styled('button')`
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }

`;

function Header({startOpen, onClick}) {
  return (
    <Wrapper startOpen={startOpen}>
      <Img src={logo} alt="logo" startOpen={startOpen}/>
      <div style={{display: startOpen ? "none" : "block"}}>
        Genre:{" "}
        <BackgroundButton id="generic" onClick={onClick}>Generic</BackgroundButton>
        <BackgroundButton id="fantasy" onClick={onClick}>Fantasy</BackgroundButton>
        <BackgroundButton id="western" onClick={onClick}>Western</BackgroundButton>
        <BackgroundButton id="scifi" onClick={onClick}>Sci-Fi</BackgroundButton>
        <BackgroundButton id="noir" onClick={onClick}>Noir</BackgroundButton>
      </div>
      <Img src={dice} alt="dice" startOpen={startOpen}/>
    </Wrapper>
  );
}

export default Header;
