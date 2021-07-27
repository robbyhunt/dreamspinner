import React, {useState} from 'react';
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
  color: #ffffff;
`;

const Button = Styled('button')`
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }
`;

const SaveLoad = Styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100;
  transition: 400ms;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = Styled('div')`
  background-color: #ffffff;
  transition: 400ms;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  position: relative;
  margin: 0 15px;
`;

const Title = Styled('p')`
  margin: 0 0 20px;
  font-size: 22px;
`;

const SaveCard = Styled('div')`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  text-align: left;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const SaveCardInner = Styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const SlotWrapper = Styled('div')`
  display: flex;
`;

const Close = Styled('p')`
  position: absolute;
  top: 0;
  right: 10px;
  cursor: pointer;
  font-size: 13px;
  opacity: 0.5;
  transition: 300ms;

  :hover {
    opacity: 1;
  }
`;


const SaveButtons = ({ user, handleSetUser, token }) => {
  const [saveLoadOpen, setSaveLoadOpen] = useState(false)
  
  const Save = (event, user, handleSetUser, token) => {
    let newUserObject = user
    newUserObject.saves[event.target.slot - 1] = {
      title: document.getElementById('title').value,
      log: document.getElementById('log').value,
      notes: document.getElementById('notes').value,
      npcs: document.getElementById('npcs').value,
      threads: document.getElementById('threads').value, 
    }
    handleSetUser(newUserObject)
    axios.post('/.netlify/functions/saveGame', {user: user}, {headers: {"Authorization": `Bearer ${token}`}})
  }
  
  const Load = async (event, user) => {
    const gameData = user.saves[event.target.slot - 1]
    document.getElementById('title').value = gameData.title
    document.getElementById('log').value = gameData.log
    document.getElementById('notes').value = gameData.notes
    document.getElementById('threads').value = gameData.threads
    document.getElementById('npcs').value = gameData.npcs
    document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
    setSaveLoadOpen(false)
  }

  return (
    <>
      <Wrapper>
        {user ? (
          <>
            Game Name: 
            <input id="title" defaultValue="Untitled Game" style={{margin: "0 10px 0 5px"}}/>
          </>
        ) : (
          <>
            {`Sign in to save  `}
          </>
        )}
        <Button disabled={user === undefined} id="save" slot={1} onClick={() => setSaveLoadOpen(true)}>Save/Load</Button>
      </Wrapper>
      <SaveLoad style={{opacity: saveLoadOpen ? "1" : "0", pointerEvents: saveLoadOpen ? "auto" : "none"}}>
        <Inner style={{opacity: saveLoadOpen ? "1" : "0", pointerEvents: saveLoadOpen ? "auto" : "none"}}>
          <Close onClick={() => setSaveLoadOpen(false)}>Close</Close>
          <Title>Save & Load Games</Title>

          {user && user.saves.map((item, index) => (
            <SaveCard>
              <span style={{fontSize: 16}}>{item.title ? item.title.length > 40 ? item.title.slice(0, 38) + "..." : item.title : item.log ? "Untitled Game" : "Empty Slot"}</span>
              <SaveCardInner>
                <span>{`Slot ${index + 1}`}</span>
                <SlotWrapper>
                  <Button id="save" slot={index + 1} onClick={e => Save(e, user, handleSetUser, token)}>Save</Button>
                  <Button disabled={item.log === undefined} id="load" slot={index + 1} onClick={e => Load(e, user)} >Load</Button>
                </SlotWrapper>
              </SaveCardInner>
            </SaveCard>
          ))}

        </Inner>
      </SaveLoad>
    </>
  );
}

export default SaveButtons;
