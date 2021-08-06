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
  flex-basis: 33.3%;
`;

const Attributes = Styled("div")`
  display: flex;
  flex-direction: column;
`;

const Attribute = Styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: ${(props) => (props.index % 2 !== 0 ? "#dddddd" : "none")};

  & > span {
    font-size: 20px;
    
    :first-of-type {
      margin-right: 10px;
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

const Stats = ({ stats }) => {
  return (
    <Wrapper>
      <AttributesContainer style={{ marginRight: 10 }}>
        <Title>Attributes:</Title>
        <Attributes>
          {stats.attributes.map((attribute, index) => (
            <Attribute key={index} index={index}>
              <span>
                {attribute.name}
                {":"}
              </span>
              <span>{attribute.value}</span>
            </Attribute>
          ))}
          <Create />
        </Attributes>
      </AttributesContainer>
      <AttributesContainer style={{ marginRight: 10 }}>
        <Title>Skills:</Title>
        <Attributes>
          {stats.skills.map((skill, index) => (
            <Attribute key={index} index={index}>
              <span>
                {skill.name}
                {":"}
              </span>
              <span>{skill.value}</span>
            </Attribute>
          ))}
          <Create />
        </Attributes>
      </AttributesContainer>
      <AttributesContainer>
        <Title>Modifieres:</Title>
        <Attributes>
          {stats.modifiers.map((modifier, index) => (
            <Attribute key={index} index={index}>
              <span>
                {modifier.name}
                {":"}
              </span>
              <span>{modifier.value}</span>
            </Attribute>
          ))}
          <Create />
        </Attributes>
      </AttributesContainer>
    </Wrapper>
  );
};

export default Stats;
