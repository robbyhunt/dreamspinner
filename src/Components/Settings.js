import React from "react";
import Styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { changeGenre } from "../actionCreators";

const Wrapper = Styled("div")`
  width: 150px;
  height: ${(props) => (props.settingsOpen ? "255px" : "35px")};
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  position: absolute;
  border-radius: 8px 8px 0 0;
  bottom: -1px;
  right: 25px;
  z-index: 10;
  transition: ease-in-out	400ms;
  filter: ${(props) =>
    props.settingsOpen ? "drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))" : "none"};
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ffffff;
`;

const Title = Styled("p")`
  margin: 8px 0 10px;
  letter-spacing: 5px;
  cursor: pointer;
`;

const Category = Styled("p")`
  margin: 8px 0;
  letter-spacing: 1px;
  text-align: left;
`;

const ButtonWrapper = Styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const Button = Styled("button")`
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 2px;
  padding: 5px 0; 

  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }
`;

function Settings({ settingsOpen, openSettings }) {
  const dispatch = useDispatch();

  const handleGenre = (e) => {
    dispatch(changeGenre(e.target.id));
  };

  return (
    <Wrapper settingsOpen={settingsOpen}>
      <Title onClick={() => openSettings(!settingsOpen)}>SETTINGS</Title>
      <Category>Genre:</Category>
      <ButtonWrapper>
        <Button id="generic" onClick={handleGenre}>
          Generic
        </Button>
        <Button id="fantasy" onClick={handleGenre}>
          Fantasy
        </Button>
        <Button id="western" onClick={handleGenre}>
          Western
        </Button>
        <Button id="scifi" onClick={handleGenre}>
          Sci-Fi
        </Button>
        <Button id="noir" onClick={handleGenre}>
          Noir
        </Button>
        <Button id="apocalyptic" onClick={handleGenre}>
          Apocalyptic
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Settings;
