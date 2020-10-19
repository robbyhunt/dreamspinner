import React from 'react';
import logo from '../img/mandala.png';
import dice from '../img/dice.png'

function Header() {
  return (
    <div className="Header">
      <img src={logo} className="Header-image" alt="logo" />
      <img src={dice} className="Header-image" alt="dice" />
    </div>
  );
}

export default Header;
