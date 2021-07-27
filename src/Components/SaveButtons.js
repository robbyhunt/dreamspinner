import React from 'react';
import Styled from "@emotion/styled";
import axios from "axios"

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

const Save = (event, user, handleSetUser) => {
  let newUserObject = user
  newUserObject.saves[event.target.slot - 1] = {
    log: document.getElementById('log').value,
    notes: document.getElementById('notes').value,
    npcs: document.getElementById('npcs').value,
    threads: document.getElementById('threads').value, 
  }
  handleSetUser(newUserObject)
  axios.post('/.netlify/functions/saveGame', {user: user})
}

const Load = async (event, user) => {
  const gameData = user.saves[event.target.slot - 1]
  document.getElementById('log').value = gameData.log
  document.getElementById('notes').value = gameData.notes
  document.getElementById('threads').value = gameData.threads
  document.getElementById('npcs').value = gameData.npcs
  document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
}

function SaveButtons({ user, handleSetUser }) {
  return (
    <Wrapper>
      <Button disabled={user === undefined} id="save" slot={1} onClick={e => Save(e, user, handleSetUser)}>Save 1</Button>
      <Button disabled={user === undefined || !user.saves[0].log} id="load" slot={1} onClick={e => Load(e, user)} style={{marginRight: 20}}>Load 1</Button>
      <Button disabled={user === undefined} id="save" slot={2} onClick={e => Save(e, user, handleSetUser)}>Save 2</Button>
      <Button disabled={user === undefined || !user.saves[1].log} id="load" slot={2} onClick={e => Load(e, user)} style={{marginRight: 20}}>Load 2</Button>
      <Button disabled={user === undefined} id="save" slot={3} onClick={e => Save(e, user, handleSetUser)}>Save 3</Button>
      <Button disabled={user === undefined || !user.saves[2].log} id="load" slot={3} onClick={e => Load(e, user)}>Load 3</Button>
    </Wrapper>
  );
}

export default SaveButtons;
