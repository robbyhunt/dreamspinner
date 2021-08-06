import React, { useState } from "react";
import Styled from "@emotion/styled";

// import { useSelector, useDispatch } from "react-redux";
// import { changeNotes, changeNPCs } from "../../actionCreators";

import Dialog from "../common/Dialog";
import ResizableContainer from "../common/ResizableContainer";

import Sheet from "./Sheet";

const Wrapper = Styled("div")`
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
  `;

const TabContainer = Styled("div")`
  position: absolute;
  top: 60px;
  right: -140px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 800px) {
    z-index: 11;
    right: -90px;
    top: 100px;
  }
`;

const Tab = Styled("div")`
  transform-origin: 0 0;
  transform: ${(props) =>
    props.isActive ? "rotate(90deg) translateY(-5px)" : "rotate(90deg)"};
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px 10px 0 0;
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  color: #ffffff;
  padding: 5px 10px 15px;
  cursor: pointer;
  user-select: none;
  transition: 200ms;

  -webkit-user-select: none;
  -ms-user-select: none;

  @media (max-width: 800px) {
    width: 60px;
    transform: ${(props) =>
      props.isActive ? "rotate(90deg) translateY(7px)" : "rotate(90deg)"};
    border-radius: 0 0 10px 10px;
    padding: 10px 10px 10px;
  }
`;

const CharacterSheet = ({ hook }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [characters, setCharacters] = useState([
    {
      name: "Kai Starborn",
      resources: [
        { name: "Wounds", value: 3, maxValue: 3, color: "	#d54e4e" },
        { name: "PP", value: 10, maxValue: 15, color: "#439eb1" },
      ],
      stats: [
        [
          { name: "Strength", value: "d6", type: "attributes" },
          { name: "Agility", value: "d6", type: "attributes" },
          { name: "Spirit", value: "d8", type: "attributes" },
          { name: "Smarts", value: "d6", type: "attributes" },
          { name: "Vigor", value: "d6", type: "attributes" },
        ],
        [
          { name: "Fighting", value: "d8", type: "skills" },
          { name: "Athletics", value: "d6", type: "skills" },
          { name: "Sneak", value: "d6", type: "skills" },
          { name: "Persuasion", value: "d4", type: "skills" },
          { name: "Notice", value: "d6", type: "skills" },
        ],
        [
          { name: "Pace", value: "d6", type: "modifiers" },
          { name: "Parry", value: "6", type: "modifiers" },
          { name: "Toughness", value: "8", type: "modifiers" },
        ],
      ],
      equipment: [
        { name: "Sword", 2: "Str+d6+1", 3: "1", notes: "AP 1" },
        {
          name: "Medium Shield",
          2: "+2 Parry",
          3: "-",
          notes: "Half cover against missile attacks",
        },
      ],
      inventory: [
        "a thing",
        "some type of other thing",
        "bedroll",
        "the amulet of elswin",
      ],
    },
  ]);

  // const {  } = useSelector((s) => s);
  // const dispatch = useDispatch();

  const initialLeft =
    document.documentElement.clientWidth > 1000
      ? "calc(80vw - 40vw)"
      : "calc(80vw - 350px)";

  return (
    <Dialog
      title="Character Sheet"
      onClose={hook[1]}
      initialPosition={{ top: "15vh", left: initialLeft }}
    >
      <ResizableContainer
        minSize={{ width: "605px", height: "300px" }}
        maxSize={{ width: "70vw", height: "90vh" }}
        initialSize={{ width: "40vw", height: "45vh" }}
      >
        <Wrapper>
          {characters.map(
            (character, index) =>
              activeTab === index && (
                <Sheet
                  data={character}
                  hook={[characters, setCharacters]}
                  sheetIndex={index}
                  key={index}
                />
              )
          )}
        </Wrapper>
      </ResizableContainer>
      <TabContainer>
        {characters.map((character, index) => (
          <Tab
            onClick={() => setActiveTab(index)}
            isActive={activeTab === index}
            key={index}
          >
            {character.name ? character.name : "Untitled"}
          </Tab>
        ))}
        <Tab style={{ width: 20 }}>+</Tab>
      </TabContainer>
    </Dialog>
  );
};

export default CharacterSheet;
