import React from 'react';
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  border-radius: 0 0 0 5px;
  z-index: 100;
`;

const Button = Styled('button')`
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }
`;

const Save = (event) => {
  localStorage.setItem(`${event.target.slot}.log`, document.getElementById('log').value)
  localStorage.setItem(`${event.target.slot}.notes`, document.getElementById('notes').value)
  localStorage.setItem(`${event.target.slot}.threads`, document.getElementById('threads').value)
  localStorage.setItem(`${event.target.slot}.npcs`, document.getElementById('npcs').value)
}

const Load = (event) => {
  document.getElementById('log').value = localStorage.getItem(`${event.target.slot}.log`)
  document.getElementById('notes').value = localStorage.getItem(`${event.target.slot}.notes`)
  document.getElementById('threads').value = localStorage.getItem(`${event.target.slot}.threads`)
  document.getElementById('npcs').value = localStorage.getItem(`${event.target.slot}.npcs`)
  document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
}

function SaveButtons() {
  return (
    <Wrapper>
      <Button id="save" slot={1} onClick={Save}>Save 1</Button>
      <Button id="load" slot={1} onClick={Load} style={{marginRight: 20}}>Load 1</Button>
      <Button id="save" slot={2} onClick={Save}>Save 2</Button>
      <Button id="load" slot={2} onClick={Load} style={{marginRight: 20}}>Load 2</Button>
      <Button id="save" slot={3} onClick={Save}>Save 3</Button>
      <Button id="load" slot={3} onClick={Load}>Load 3</Button>
    </Wrapper>
  );
}

export default SaveButtons;
