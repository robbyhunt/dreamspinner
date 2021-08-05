import React from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const AttributesContainer = Styled("div")`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  max-width: 250px;
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
  background-color: ${(props) => (props.index % 2 != 0 ? "#dddddd" : "none")};

  & > span {
    font-size: 20px;
    
    :first-of-type {
      margin-right: 10px;
    }
  }
`;

const SkillsContainer = Styled(AttributesContainer)`
`;

const Skills = Styled(Attributes)`
`;

const Skill = Styled(Attribute)`
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

const Stats = ({ stats }) => {
  return (
    <Wrapper>
      <AttributesContainer style={{ marginRight: 20 }}>
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
        </Attributes>
      </AttributesContainer>
      <SkillsContainer>
        <Title>Skills:</Title>
        <Skills>
          {stats.skills.map((skill, index) => (
            <Skill key={index} index={index}>
              <span>
                {skill.name}
                {":"}
              </span>
              <span>{skill.value}</span>
            </Skill>
          ))}
        </Skills>
      </SkillsContainer>
    </Wrapper>
  );
};

export default Stats;
