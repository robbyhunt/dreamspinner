import React from "react";
import Styled from "@emotion/styled";

import Resources from "./Resources";
import Stats from "./Stats";

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
  padding: 10px;
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
  font-size: 20px;
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
      </Right>
    </Wrapper>
  );
};

export default Sheet;
