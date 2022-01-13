/*global netlifyIdentity*/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLog,
  changeInput,
  changeUser,
  changeNotes,
  changeThreads,
  changeNPCs,
  changeTitle,
  changeCharacters,
  changeInspiration,
} from "../../actionCreators";
import Styled from "@emotion/styled";
import axios from "axios";

import Confirmation from "../common/Confirmation";
import CloseIcon from "../../img/icons/close-black.svg";

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

  :disabled {
    cursor: not-allowed;
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
  border-radius: 5px;
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

const CloseButton = Styled("div")`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.7;
  transition: 200ms;
  background-image: url(${CloseIcon});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  height: 6px;
  width: 6px;

  :hover {
    opacity: 1;
  }
`;

const SaveModal = ({ setSaveLoadOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [savePayload, setSavePayload] = useState(undefined);
  const [loadConfirmOpen, setLoadConfirmOpen] = useState(false);
  const [loadPayload, setLoadPayload] = useState(undefined);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [clearPayload, setClearPayload] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const {
    log,
    user,
    notes,
    threads,
    npcs,
    title,
    input,
    characters,
    inspiration,
  } = useSelector((s) => s);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const close = () => {
    setIsOpen(false);
    setTimeout(function () {
      setSaveLoadOpen(false);
    }, 500);
  };

  const SaveConfirm = (e) => {
    if (user.saves[e.target.slot].log === undefined) {
      Save(e.target.slot);
    } else {
      setSavePayload(e.target.slot);
      setSaveConfirmOpen(true);
    }
  };

  const Save = async (slot) => {
    setIsLoading(true);

    let newUserObject = { ...user };
    newUserObject.saves[slot] = {
      title,
      log,
      notes,
      npcs,
      threads,
      characters,
      inspiration,
    };

    let token;
    await netlifyIdentity.refresh().then((returnedToken) => {
      token = returnedToken;
    });

    await axios.post(
      "/.netlify/functions/saveGame",
      { user: newUserObject },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await dispatch(changeUser(newUserObject));
    setIsLoading(false);
  };

  const ClearConfirm = (e) => {
    setClearPayload(e.target.slot);
    setClearConfirmOpen(true);
  };

  const Clear = async (slot) => {
    setIsLoading(true);

    let newUserObject = { ...user };
    newUserObject.saves[slot] = {};

    let token;
    await netlifyIdentity.refresh().then((returnedToken) => {
      token = returnedToken;
    });

    await axios.post(
      "/.netlify/functions/saveGame",
      { user: newUserObject },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await dispatch(changeUser(newUserObject));
    setIsLoading(false);
  };

  const LoadConfirm = (e) => {
    if (input === "" && log === "" && !threads[0] && !npcs[0]) {
      Load(e.target.slot);
    } else {
      setLoadPayload(e.target.slot);
      setLoadConfirmOpen(true);
    }
  };

  const Load = async (slot) => {
    const gameData = user.saves[slot];
    dispatch(changeTitle(gameData.title));
    dispatch(changeThreads(gameData.threads));
    dispatch(changeNotes(gameData.notes));
    dispatch(changeNPCs(gameData.npcs));
    dispatch(changeCharacters(gameData.characters));
    dispatch(changeInspiration(gameData.inspiration));
    dispatch(changeInput(""));
    await dispatch(changeLog(gameData.log));

    document.getElementById("log").scrollTop =
      document.getElementById("log").scrollHeight;

    close();
  };

  return (
    <>
      <Modal
        style={{
          opacity: isOpen ? "1" : "0",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <Inner
          style={{
            opacity: isOpen ? "1" : "0",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <CloseButton onClick={() => close()} />
          <Title>Save & Load Games</Title>

          {user.saves.map((item, index) => (
            <SaveCard key={index}>
              <span style={{ fontSize: 16 }}>
                {item.title
                  ? item.title.length > 37
                    ? item.title.slice(0, 35) + "..."
                    : item.title
                  : item.log
                  ? "Untitled Game"
                  : "Empty Slot"}
              </span>
              <SaveCardInner>
                <span>{`Slot ${index + 1}`}</span>
                <SlotWrapper>
                  <Button
                    id="save"
                    slot={index}
                    onClick={(e) => SaveConfirm(e)}
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                  <Button
                    disabled={item.log === undefined || isLoading}
                    id="load"
                    slot={index}
                    onClick={(e) => LoadConfirm(e)}
                  >
                    Load
                  </Button>
                  <Button
                    disabled={item.log === undefined || isLoading}
                    id="clear"
                    slot={index}
                    onClick={(e) => ClearConfirm(e)}
                  >
                    Clear
                  </Button>
                </SlotWrapper>
              </SaveCardInner>
            </SaveCard>
          ))}
        </Inner>
      </Modal>

      {saveConfirmOpen && (
        <Confirmation
          title="Are you sure you want to overwrite this slot?"
          subTitle="This will wipe any previous data and cannot be undone."
          isOpen={saveConfirmOpen}
          onCancel={() => setSaveConfirmOpen(false)}
          onConfirm={() => Save(savePayload)}
        />
      )}

      {loadConfirmOpen && (
        <Confirmation
          title="Are you sure you want to load this save?"
          subTitle="Any unsaved data in your current game will be lost."
          isOpen={loadConfirmOpen}
          onCancel={() => setLoadConfirmOpen(false)}
          onConfirm={() => Load(loadPayload)}
        />
      )}

      {clearConfirmOpen && (
        <Confirmation
          title="Are you sure you want to clear this save?"
          subTitle="This will wipe all data in this slot and cannot be undone."
          isOpen={clearConfirmOpen}
          onCancel={() => setClearConfirmOpen(false)}
          onConfirm={() => Clear(clearPayload)}
        />
      )}
    </>
  );
};

export default SaveModal;
