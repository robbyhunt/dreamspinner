import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLog,
  changeInput,
  changeNotes,
  changeThreads,
  changeNPCs,
  changeTitle,
} from "../../actionCreators";
import Styled from "@emotion/styled";

import SaveModal from "./SaveModal";
import Confirmation from "../common/Confirmation";

const SaveButtonContainer = Styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
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

  :disabled {
    cursor: not-allowed;
  }
`;

const SaveLoad = () => {
  const [saveLoadOpen, setSaveLoadOpen] = useState(false);
  const [newGameConfirmation, setNewGameConfirmation] = useState(false);

  const { user, title } = useSelector((s) => s);
  const dispatch = useDispatch();

  const newGame = () => {
    dispatch(changeTitle("Untitled Game"));
    dispatch(changeThreads([]));
    dispatch(changeNotes(""));
    dispatch(changeNPCs([]));
    dispatch(changeInput(""));
    dispatch(changeLog(""));
  };

  return (
    <>
      <SaveButtonContainer>
        {user.saves ? (
          <>
            Game Name:
            <input
              id="title"
              value={title}
              onChange={(e) => dispatch(changeTitle(e.target.value))}
              style={{ margin: "0 10px 0 5px" }}
            />
          </>
        ) : (
          <>{`Sign in to save  `}</>
        )}
        <Button
          disabled={user.saves === undefined}
          onClick={() => setSaveLoadOpen(true)}
          style={{ marginRight: 5 }}
        >
          Save/Load
        </Button>
        <Button onClick={() => setNewGameConfirmation(true)}>New Game</Button>
      </SaveButtonContainer>
      {saveLoadOpen && <SaveModal setSaveLoadOpen={setSaveLoadOpen} />}

      {newGameConfirmation && (
        <Confirmation
          title="Are you sure you want to start a new game?"
          subTitle="This will wipe any unsaved data and cannot be undone."
          isOpen={newGameConfirmation}
          onCancel={() => setNewGameConfirmation(false)}
          onConfirm={newGame}
        />
      )}
    </>
  );
};

export default SaveLoad;
