import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { changeLog, addToLog, undoLog, changeInput } from "../actionCreators";

import { Fate, Event, ComplexQuestion, Place, Npc, Item } from "../Generators";
import RollDice from "../util/DiceRoll";

const Wrapper = Styled("div")`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Inner = Styled("div")`
  width: 100%; 
  max-width: 1500px; 
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));
  margin-top: 40px;

  @media (min-width: 457px) {
    margin-top: 0px;
  }
`;

const ButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 20px);
  flex-wrap: wrap;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  padding: 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;


  @media (min-width: 958px) {
    flex-direction: row;
  }
`;

const GeneratorWrapper = Styled("div")`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  color: white;
  align-items: center;

  @media (min-width: 958px) {
    margin-bottom: 0;
  }
`;

const FateButtonWrapper = Styled("div")`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;

  @media (min-width: 958px) {
    margin-bottom: 0;
  }
`;

const DiceButtonWrapper = Styled("div")`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;
  margin-top: 0;

  @media (min-width: 958px) {
    margin-bottom: 0;
    margin-top: 15px;
  }

  @media (min-width: 1110px) {
    margin-top: 0;
  }
`;

const LogButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  margin-left: 0;

  @media (min-width: 958px) {
    justify-content: flex-end;
    margin-top: 15px;
  }

  @media (min-width: 1110px) {
    margin-left: calc(100% - 280px);
  }

  @media (min-width: 1531px) {
    margin-top: 0;
    margin-left: 0;
  }
`;

const Button = Styled("button")`
  cursor: pointer;
  margin-left: 0px;
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

  @media (min-width: 958px) {
    margin-left: 10px;
  }
`;

const GenerateButton = Styled(Button)`
`;

const Log = Styled("textarea")`
  width: calc(100% - 20px);
  height: 40vh;
  resize: none;
  padding: 10px;
  font-size: 22px;
  line-height: 30px;

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

  @media (min-width: 958px) {
    height: 50vh;
  }

  @media (min-width: 1249px) {
    height: 55vh;
  }

  @media (min-width: 1531px) {
    height: 60vh;
  }
`;

const Input = Styled("textarea")`
  width: calc(100% - 20px);
  padding: 10px;
  height: 60px;
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

  @media (min-width: 1531px) {
    height: 100px;
  }

  &:focus {
    outline: none;
  }
`;

const Play = ({ activeGenre }) => {
  const [isEditActive, setIsEditActive] = useState(false);

  const { log, input } = useSelector((s) => s);
  const dispatch = useDispatch();

  const handleGenerator = (e) => {
    let result;

    switch (e.target.name) {
      case "place":
        result = Place(e);
        break;
      case "item":
        result = Item(e);
        break;
      case "npc":
        result = Npc(e);
        break;
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
      dispatch(addToLog(result[0]));
      const event = Event(result[1]);
      if (event) {
        dispatch(addToLog(event));
      }
    } else {
      dispatch(addToLog(result));
    }
  };

  const handleSubmit = (e, isButton = false) => {
    if (isButton || (e.key === "Enter" && e.shiftKey)) {
      const submission = input.replace(/\n.*$/, "");
      dispatch(changeInput(""));
      dispatch(addToLog(submission));
    }
  };

  const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

  return (
    <Wrapper>
      <Inner>
        <ButtonWrapper>
          <Button
            id={`${activeGenre}`}
            name="place"
            onClick={handleGenerator}
            style={{ marginLeft: "0" }}
          >
            Place (Only works for fantasy atm)
          </Button>
          <Button id={`${activeGenre}`} name="item" onClick={handleGenerator}>
            Item (Only works for apocalyptic atm)
          </Button>
          <Button id={`${activeGenre}`} name="npc" onClick={handleGenerator}>
            Character (Only works for fantasy atm)
          </Button>
        </ButtonWrapper>

        <Log
          name="log"
          id="log"
          readOnly={!isEditActive}
          value={log}
          onChange={(e) => dispatch(changeLog(e.target.value))}
        />

        <ButtonWrapper>
          <GeneratorWrapper>
            Complex Question:
            <GenerateButton id="cqa" name="complex" onClick={handleGenerator}>
              Action
            </GenerateButton>
            <GenerateButton id="cqd" name="complex" onClick={handleGenerator}>
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
            <Button id="edit" onClick={() => setIsEditActive(!isEditActive)}>
              {isEditActive ? "Confirm" : "Edit"}
            </Button>
            <Button id="clear" onClick={() => dispatch(changeLog(""))}>
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
    </Wrapper>
  );
};

export default Play;
