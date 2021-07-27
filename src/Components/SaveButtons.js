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

const Save = (event, username) => {
  axios.post('/.netlify/functions/saveGame', {
    username: username,
    slot: event.target.slot,
    data: {
      log: document.getElementById('log').value,
      notes: document.getElementById('notes').value,
      npcs: document.getElementById('npcs').value,
      threads: document.getElementById('threads').value,  
    }
  })
}

const Load = async (event, username) => {
  const gameData = await axios.post('/.netlify/functions/loadGame', {
    username: username,
    slot: event.target.slot
  })
  document.getElementById('log').value = gameData.data.log
  document.getElementById('notes').value = gameData.data.notes
  document.getElementById('threads').value = gameData.data.threads
  document.getElementById('npcs').value = gameData.data.npcs
  document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
}

function SaveButtons({ username }) {
  return (
    <Wrapper>
      <Button disabled={username === ""} id="save" slot={1} onClick={e => Save(e, username)}>Save 1</Button>
      <Button disabled={username === ""} id="load" slot={1} onClick={e => Load(e, username)} style={{marginRight: 20}}>Load 1</Button>
      <Button disabled={username === ""} id="save" slot={2} onClick={e => Save(e, username)}>Save 2</Button>
      <Button disabled={username === ""} id="load" slot={2} onClick={e => Load(e, username)} style={{marginRight: 20}}>Load 2</Button>
      <Button disabled={username === ""} id="save" slot={3} onClick={e => Save(e, username)}>Save 3</Button>
      <Button disabled={username === ""} id="load" slot={3} onClick={e => Load(e, username)}>Load 3</Button>
    </Wrapper>
  );
}

export default SaveButtons;
