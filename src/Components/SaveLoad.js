/*global netlifyIdentity*/

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLog,
  changeInput,
  changeUser,
  changeNotes,
  changeThreads,
  changeNPCs,
} from "../actionCreators";
import Styled from "@emotion/styled";
import axios from "axios";

const SaveButtonContainer = Styled("div")`
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

const Button = Styled("button")`
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

const Modal = Styled("div")`
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

const Inner = Styled("div")`
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

const Title = Styled("p")`
  margin: 0 0 20px;
  font-size: 22px;
`;

const SaveCard = Styled("div")`
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

const SaveCardInner = Styled("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const SlotWrapper = Styled("div")`
  display: flex;
`;

const Close = Styled("p")`
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

const SaveLoad = () => {
  const [saveLoadOpen, setSaveLoadOpen] = useState(false);

  const { log, user, notes, threads, npcs } = useSelector((s) => s);
  const dispatch = useDispatch();

  const Save = async (event) => {
    let newUserObject = user;
    newUserObject.saves[event.target.slot] = {
      title: document.getElementById("title").value,
      log,
      notes,
      npcs,
      threads,
    };
    dispatch(changeUser(newUserObject));

    let token;
    await netlifyIdentity.refresh().then((returnedToken) => {
      token = returnedToken;
    });

    axios.post(
      "/.netlify/functions/saveGame",
      { user: user },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const Load = async (event) => {
    const gameData = user.saves[event.target.slot];
    document.getElementById("title").value = gameData.title;
    dispatch(changeThreads(gameData.threads));
    dispatch(changeNotes(gameData.notes));
    dispatch(changeNPCs(gameData.npcs));
    dispatch(changeInput(""));
    await dispatch(changeLog(gameData.log));

    document.getElementById("log").scrollTop =
      document.getElementById("log").scrollHeight;

    setSaveLoadOpen(false);
  };

  const newGame = () => {
    document.getElementById("title").value = "Untitled Game";
    dispatch(changeThreads(""));
    dispatch(changeNotes(""));
    dispatch(changeNPCs(""));
    dispatch(changeInput(""));
    dispatch(changeLog(""));
  };

  return (
    <>
      <SaveButtonContainer>
        {user ? (
          <>
            Game Name:
            <input
              id="title"
              defaultValue="Untitled Game"
              style={{ margin: "0 10px 0 5px" }}
            />
          </>
        ) : (
          <>{`Sign in to save  `}</>
        )}
        <Button
          disabled={user === undefined}
          onClick={() => setSaveLoadOpen(true)}
          style={{ marginRight: 5 }}
        >
          Save/Load
        </Button>
        <Button onClick={newGame}>New Game</Button>
      </SaveButtonContainer>

      {user && (
        <Modal
          style={{
            opacity: saveLoadOpen ? "1" : "0",
            pointerEvents: saveLoadOpen ? "auto" : "none",
          }}
        >
          <Inner
            style={{
              opacity: saveLoadOpen ? "1" : "0",
              pointerEvents: saveLoadOpen ? "auto" : "none",
            }}
          >
            <Close onClick={() => setSaveLoadOpen(false)}>Close</Close>
            <Title>Save & Load Games</Title>

            {user.saves.map((item, index) => (
              <SaveCard key={index}>
                <span style={{ fontSize: 16 }}>
                  {item.title
                    ? item.title.length > 40
                      ? item.title.slice(0, 38) + "..."
                      : item.title
                    : item.log
                    ? "Untitled Game"
                    : "Empty Slot"}
                </span>
                <SaveCardInner>
                  <span>{`Slot ${index + 1}`}</span>
                  <SlotWrapper>
                    <Button id="save" slot={index} onClick={(e) => Save(e)}>
                      Save
                    </Button>
                    <Button
                      disabled={item.log === undefined}
                      id="load"
                      slot={index}
                      onClick={(e) => Load(e)}
                    >
                      Load
                    </Button>
                  </SlotWrapper>
                </SaveCardInner>
              </SaveCard>
            ))}
          </Inner>
        </Modal>
      )}
    </>
  );
};

export default SaveLoad;
