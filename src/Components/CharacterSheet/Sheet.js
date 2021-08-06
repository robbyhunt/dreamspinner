import React from "react";
import Styled from "@emotion/styled";

import Resources from "./Resources";
import Stats from "./Stats";
import Equipment from "./Equipment";
import Inventory from "./Inventory";

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
  padding: 20px 20px;
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

const Name = Styled("p")`
  font-size: 24px;
  font-weight: 500;
`;

const Sheet = ({ data }) => {
  return (
    <Wrapper>
      <Left>
        <Name>{data.name}</Name>
        <Resources resources={data.resources} />
      </Left>
      <Right>
        <Stats stats={data.stats} />
        <Equipment equipment={data.equipment} />
        <Inventory inventory={data.inventory} />
      </Right>
    </Wrapper>
  );
};

export default Sheet;
