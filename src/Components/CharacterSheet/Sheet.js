import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { addToLog } from "../../actionCreators";

import RollDice from "../../util/DiceRoll";
import ScrollLogToBottom from "../../util/ScrollLogToBottom";

import Resources from "./Resources";
import Stats from "./Stats";
import Equipment from "./Equipment";
import Inventory from "./Inventory";
import Avatar from "./Avatar";
import Powers from "./Powers";
import Bio from "./Bio";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  margin-right: 5px;
  display: flex;
  font-family: "Patrick Hand";
`;

const Right = Styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex-basis: 70%;
  padding: 10px 20px 20px;
  overflow-y: scroll;

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
`;

const Left = Styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex-basis: 30%;
  border-right: 1px solid #dddddd;
  padding: 10px;
  
  & > p {
    margin: 0;
  }
`;

const RollSettings = Styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Sheet = ({ data, sheetIndex }) => {
  const [isExplosive, setIsExplosive] = useState(true);
  const [isWild, setIsWild] = useState(true);

  const dispatch = useDispatch();

  const rollStat = async (statName, diceValue) => {
    const result = RollDice(diceValue, isExplosive, isWild, statName);
    await dispatch(addToLog(result));
    ScrollLogToBottom();
  };

  return (
    <Wrapper>
      <Left>
        <Avatar avatar={data.avatar} name={data.name} sheetIndex={sheetIndex} />
        <Resources resources={data.resources} sheetIndex={sheetIndex} />
      </Left>
      <Right>
        <RollSettings>
          Wild?
          <input
            type="checkbox"
            checked={isWild}
            onChange={(e) => setIsWild(e.target.checked)}
            style={{ marginRight: 20 }}
          />
          Exploding?
          <input
            type="checkbox"
            checked={isExplosive}
            onChange={(e) => setIsExplosive(e.target.checked)}
          />
        </RollSettings>
        <Stats stats={data.stats} sheetIndex={sheetIndex} rollStat={rollStat} />
        <Equipment equipment={data.equipment} sheetIndex={sheetIndex} />
        <Powers powers={data.powers} sheetIndex={sheetIndex} />
        <Inventory inventory={data.inventory} sheetIndex={sheetIndex} />
        <Bio bio={data.bio} sheetIndex={sheetIndex} />
      </Right>
    </Wrapper>
  );
};

export default Sheet;
