import React from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { addToLog, changeInput } from "../actionCreators";

import { Place, Npc, Item, Name } from "../Generators";

import Dialog from "./common/Dialog";
import ResizableContainer from "./common/ResizableContainer";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
`;

const Button = Styled("button")`
  cursor: pointer;
  background-color: #efefefef;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 80%;
  margin: 0 5px;
  transition: 200ms;
  
  &:hover {
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const Generators = ({ hook }) => {
  const { genre, input } = useSelector((s) => s);

  const dispatch = useDispatch();

  const handleGenerator = async (e) => {
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
      case "name":
        result = Name(e);
        break;

      default:
        break;
    }

    if (input !== "") {
      await dispatch(addToLog(input));
      dispatch(changeInput(""));
    }
    await dispatch(addToLog(result));
    document.getElementById("log").scrollTop =
      document.getElementById("log").scrollHeight;
  };

  const generators = [
    ["place", "fantasy"],
    ["name", "fantasy"],
    ["item", "apocalyptic"],
    ["npc", "fantasy"],
  ];

  return (
    <Dialog
      title="Generators"
      onClose={hook[1]}
      initialPosition={{ top: "150px", left: "45vw" }}
    >
      <ResizableContainer
        minSize={{ width: "200px", height: "200px" }}
        maxSize={{ width: "400px", height: "400px" }}
        initialSize={{ width: "200px", height: "200px" }}
      >
        <Wrapper>
          {generators.map((item) => (
            <Button
              id={`${genre}`}
              name={item[0]}
              key={item[0]}
              onClick={handleGenerator}
              disabled={item[1] !== genre}
            >
              {item[0].charAt(0).toUpperCase() + item[0].slice(1)}
            </Button>
          ))}
        </Wrapper>
      </ResizableContainer>
    </Dialog>
  );
};

export default Generators;
