import React from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-around;
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
  background-color: ${(props) => (props.index % 2 == 0 ? "#dddddd" : "none")};

  & > span {
    font-size: 20px;
    
    :first-of-type {
      margin-right: 10px;
    }
  }
`;

const Skills = Styled(Attributes)`
`;

const Skill = Styled(Attribute)`
`;

const Stats = ({ stats }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Stats;
