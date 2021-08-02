import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import {
  changeLog,
  addToLog,
  undoLog,
  changeInput,
} from "../../actionCreators";

import { Fate, Event, ComplexQuestion } from "../../Generators";
import RollDice from "../../util/DiceRoll";
import Dialog from "../common/Dialog";
import ResizableContainer from "../common/ResizableContainer";

import Confirmation from "../common/Confirmation";

const Inner = Styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

const ButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  flex-wrap: wrap;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  padding: 10px 10px 0;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const GeneratorWrapper = Styled("div")`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  color: white;
  align-items: center;

`;

const FateButtonWrapper = Styled("div")`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;

`;

const DiceButtonWrapper = Styled("div")`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;
  margin-top: 0;

`;

const LogButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 10px;

`;

const Button = Styled("button")`
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
  
  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }
`;

const GenerateButton = Styled(Button)`
`;

const LogArea = Styled("textarea")`
  width: calc(100% - 25px);
  height: 85%;
  resize: none;
  padding: 10px;
  font-size: 22px;
  line-height: 30px;
  margin-right: 5px;
  border: none;
  background-color: ${(props) => props.iseditactive && "rgba(0, 0, 0, 0.1)"};

  ::-webkit-scrollbar {
    width: 5px;
  }
 
  ::-webkit-scrollbar-track {
    background-color: #ffffff; 
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #376d99;
  }

  &:focus {
    outline: none;
  }
`;

const Input = Styled("textarea")`
  width: calc(100% - 20px);
  padding: 10px;
  height: 15%;
  resize: none;
  font-size: 20px;

  ::-webkit-scrollbar {
    width: 5px;
  }
 
  ::-webkit-scrollbar-track {
    background-color: #ffffff; 
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #376d99;
  }

  &:focus {
    outline: none;
  }
`;

const Log = () => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const { log, input } = useSelector((s) => s);
  const dispatch = useDispatch();

  const handleGenerator = async (e) => {
    let result;

    switch (e.target.name) {
      case "complex":
        result = ComplexQuestion(e);
        break;
      case "fate":
        result = Fate(e);
        break;
      case "dice":
        result = RollDice(e);
        break;

      default:
        break;
    }

    if (Array.isArray(result)) {
      if (input !== "") {
        await dispatch(addToLog(input));
        dispatch(changeInput(""));
      }
      await dispatch(addToLog(result[0]));
      scrollLogToBottom();
      const event = Event(result[1]);
      if (event) {
        await dispatch(addToLog(event));
        scrollLogToBottom();
      }
    } else {
      if (input !== "") {
        await dispatch(addToLog(input));
        dispatch(changeInput(""));
      }
      await dispatch(addToLog(result));
      scrollLogToBottom();
    }
  };

  const handleSubmit = async (e, isButton = false) => {
    if (isButton || (e.key === "Enter" && e.shiftKey)) {
      const submission = input.replace(/\n.*$/, "");
      if (input !== "") {
        dispatch(changeInput(""));
        await dispatch(addToLog(submission));
      }
      scrollLogToBottom();
    }
  };

  const scrollLogToBottom = () => {
    document.getElementById("log").scrollTop =
      document.getElementById("log").scrollHeight;
  };

  const Clear = () => {
    dispatch(changeLog(""));
  };

  const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

  return (
    <>
      <Dialog
        title="Game Log"
        initialPosition={{ top: "-120px", left: "-120px" }}
      >
        <ResizableContainer
          minSize={{ width: "725px", height: "400px" }}
          maxSize={{ width: "90vw", height: "85vh" }}
          initialSize={{ width: "50vw", height: "75vh" }}
        >
          <Inner>
            <LogArea
              name="log"
              id="log"
              readOnly={!isEditActive}
              iseditactive={isEditActive}
              value={log}
              onChange={(e) => dispatch(changeLog(e.target.value))}
            />

            <ButtonWrapper>
              <GeneratorWrapper>
                Complex Question:
                <GenerateButton
                  id="cqa"
                  name="complex"
                  onClick={handleGenerator}
                >
                  Action
                </GenerateButton>
                <GenerateButton
                  id="cqd"
                  name="complex"
                  onClick={handleGenerator}
                >
                  Description
                </GenerateButton>
              </GeneratorWrapper>

              <FateButtonWrapper>
                Yes / No:
                <Button id="fateunlikely" name="fate" onClick={handleGenerator}>
                  Unlikely
                </Button>
                <Button id="fate5050" name="fate" onClick={handleGenerator}>
                  50/50
                </Button>
                <Button id="fatelikely" name="fate" onClick={handleGenerator}>
                  Likely
                </Button>
              </FateButtonWrapper>

              <DiceButtonWrapper>
                Dice:
                {dice.map((item) => (
                  <Button
                    key={item}
                    id={item}
                    name="dice"
                    onClick={handleGenerator}
                  >
                    {item}
                  </Button>
                ))}
              </DiceButtonWrapper>

              <LogButtonWrapper>
                <Button id="submit" onClick={(e) => handleSubmit(e, true)}>
                  Submit
                </Button>
                <Button id="undo" onClick={() => dispatch(undoLog())}>
                  Undo
                </Button>
                <Button
                  id="edit"
                  onClick={() => setIsEditActive(!isEditActive)}
                >
                  {isEditActive ? "Confirm" : "Edit"}
                </Button>
                <Button
                  id="clear"
                  disabled={log === ""}
                  onClick={() => setClearConfirmOpen(true)}
                >
                  Clear Log
                </Button>
              </LogButtonWrapper>
            </ButtonWrapper>

            <Input
              name="input"
              id="input"
              placeholder="Type something here and press Shift + Enter or click Submit..."
              rows={1}
              onKeyUp={handleSubmit}
              value={input}
              onChange={(e) => dispatch(changeInput(e.target.value))}
            />
          </Inner>
        </ResizableContainer>
      </Dialog>

      <Confirmation
        title="Are you sure you want to clear the log?"
        subTitle="This will wipe any unsaved data and cannot be undone."
        isOpen={clearConfirmOpen}
        onCancel={() => setClearConfirmOpen(false)}
        onConfirm={() => Clear()}
      />
    </>
  );
};

export default Log;
