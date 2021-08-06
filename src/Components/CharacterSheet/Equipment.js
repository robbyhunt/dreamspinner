import React from "react";
import Styled from "@emotion/styled";

import CreateIcon from "../../img/icons/create.svg";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AttributesContainer = Styled("div")`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

const Attributes = Styled("div")`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Attribute = Styled("div")`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.index % 2 !== 0 ? "#dddddd" : "none")};
  width: calc(100% - 20px);
  padding: 0 10px;
  
  & > span {
    font-size: 20px;
    margin-right: 10px;

    :last-of-type {
      margin-right: 0;
    }
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
  display: flex;
`;

const Create = Styled("div")`
  cursor: pointer;
  opacity: 0.6;
  background-image: url(${CreateIcon});
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  height: 20px;
  width: 100%;
  transition: 200ms;
  margin-top: 5px;
  
  :hover {
    opacity: 1;
  }
`;

const Equipment = ({ equipment }) => {
  return (
    <>
      <Title>
        <span style={{ flexBasis: "40%" }}>Equipment:</span>
        <span style={{ flexBasis: "20%" }}>DMG/DEF:</span>
        <span style={{ flexBasis: "10%" }}>Range:</span>
        <span style={{ flexBasis: "30%" }}>Notes:</span>
      </Title>
      <Wrapper>
        <AttributesContainer>
          <Attributes>
            {equipment.map((item, index) => (
              <Attribute key={index} index={index}>
                <span style={{ flexBasis: "40%" }}>{item.name}</span>
                <span style={{ flexBasis: "20%" }}>{item[2]}</span>
                <span style={{ flexBasis: "10%" }}>{item[3]}</span>
                <span style={{ flexBasis: "30%" }}>
                  {item.notes.length > 14
                    ? item.notes.slice(0, 13) + "..."
                    : item.notes}
                </span>
              </Attribute>
            ))}
            <Create />
          </Attributes>
        </AttributesContainer>
      </Wrapper>
    </>
  );
};

export default Equipment;
