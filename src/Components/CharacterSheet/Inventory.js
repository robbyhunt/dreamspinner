import React from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
`;

const AttributesContainer = Styled("div")`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

const Attributes = Styled("div")`
  display: flex;
  flex-direction: column;
`;

const Attribute = Styled("div")`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.index % 2 !== 0 ? "#dddddd" : "none")};
  width: calc(100% - 20px);
  padding: 0 10px;
  
  & > span {
    font-size: 20px;
  }
`;

const Title = Styled("p")`
  margin: 0;
  text-align: left;
  font-size: 20px;
  background-color: #000000;
  color: #ffffff;
  width: calc(100% - 20px);
  padding: 0 10px;
  max-width: 680px;
`;

const Inventory = ({ inventory }) => {
  return (
    <>
      <Title>Inventory:</Title>
      <Wrapper>
        <AttributesContainer>
          <Attributes>
            {inventory.map((item, index) => (
              <Attribute key={index} index={index}>
                <span>{item}</span>
              </Attribute>
            ))}
          </Attributes>
        </AttributesContainer>
      </Wrapper>
    </>
  );
};

export default Inventory;
