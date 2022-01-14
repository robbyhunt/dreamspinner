import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeCharacters } from "../../actionCreators";

import Styled from "@emotion/styled";

import CreateIcon from "../../img/icons/create.svg";
import EditIcon from "../../img/icons/edit-white.svg";
import DeleteIcon from "../../img/icons/close-black.svg";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const AttributesContainer = Styled("div")`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  position: relative;
`;

const Attributes = Styled("div")`
  display: flex;
  flex-direction: column;
`;

const Attribute = Styled("div")`
  align-items: center;
  padding: ${(props) => (props.iseditable ? "0" : "0 10px")};
  background-color: ${(props) => (props.index % 2 !== 0 ? "#dddddd" : "none")};
  text-align: left;
  height: 27px;
  position: relative;

& > div {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    & > span {
      font-size: 20px;
      
      :first-of-type {
        margin-right: 10px;
      }
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
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: none;
  
  :hover {
    opacity: 1;
  }
`;

const Edit = Styled("div")`
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 2px;
  opacity: 1;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: url(${EditIcon});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  transition: 200ms;
  
  :hover {
    opacity: 0.7;
  }
`;

const AttributeEdit = Styled("textarea")`
  resize: none;
  width: 80%;
  height: calc(100% - 3px);
  padding: 3px 0 0 5px;
  outline: none;
  border: 1px solid #efefefef;
  background-color: rgba(0,0,0,0);

  :focus {
    outline: none;
    border: 1px solid #efefefef;
  }
`;

const AttributeValueEdit = Styled(AttributeEdit)`
  text-align: right;
  width: 20%;
  padding: 3px 5px 0;
`;

const Delete = Styled(Edit)`
  top: 2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background-image: url(${DeleteIcon});
`;

const Stats = ({ stats, sheetIndex, rollStat }) => {
  const [attributesEditable, setAttributesEditable] = useState(false);
  const [skillsEditable, setSkillsEditable] = useState(false);
  const [modifiersEditable, setModifiersEditable] = useState(false);

  const { characters } = useSelector((s) => s);
  const dispatch = useDispatch();

  const hooks = {
    attributes: attributesEditable,
    skills: skillsEditable,
    modifiers: modifiersEditable,
  };

  const handleToggleEdit = (e) => {
    switch (e.target.id) {
      case "attributes":
        setAttributesEditable(!attributesEditable);
        break;
      case "skills":
        setSkillsEditable(!skillsEditable);
        break;
      case "modifiers":
        setModifiersEditable(!modifiersEditable);
        break;

      default:
        break;
    }
  };

  const handleChangeStats = (e, statsIndex, statIndex) => {
    let tempData = [...characters];

    if (e.target.id.includes("name")) {
      tempData[sheetIndex].stats[statsIndex][statIndex].name = e.target.value;
    } else if (e.target.id.includes("value")) {
      tempData[sheetIndex].stats[statsIndex][statIndex].value = e.target.value;
    }

    dispatch(changeCharacters(tempData));
  };

  const handleCreateStat = (statsIndex, type) => {
    switch (type) {
      case "attributes":
        setAttributesEditable(true);
        break;
      case "skills":
        setSkillsEditable(true);
        break;
      case "modifiers":
        setModifiersEditable(true);
        break;

      default:
        break;
    }

    let tempData = [...characters];
    tempData[sheetIndex].stats[statsIndex].push({ name: "", value: "", type });

    dispatch(changeCharacters(tempData));
  };

  const handleDeleteStat = (statsIndex, statIndex) => {
    let tempData = [...characters];
    tempData[sheetIndex].stats[statsIndex].splice(statIndex, 1);

    dispatch(changeCharacters(tempData));
  };

  const hookIndex = [attributesEditable, skillsEditable, modifiersEditable];

  return (
    <Wrapper>
      {stats.map((stat, statsIndex) => {
        let type;
        switch (statsIndex) {
          case 0:
            type = "attributes";
            break;
          case 1:
            type = "skills";
            break;
          case 2:
            type = "modifiers";
            break;

          default:
            break;
        }
        return (
          <AttributesContainer
            key={statsIndex}
            style={{ marginRight: statsIndex !== 2 && 10 }}
          >
            <Title>{type.charAt(0).toUpperCase() + type.slice(1, 99)}:</Title>
            <Edit id={type} onClick={(e) => handleToggleEdit(e)} />
            <Attributes>
              {stat.map((attribute, statIndex) => (
                <Attribute
                  key={statIndex}
                  index={statIndex}
                  iseditable={hooks[attribute.type]}
                >
                  {!hooks[attribute.type] ? (
                    <div
                      onClick={() => rollStat(attribute.name, attribute.value)}
                    >
                      <span style={{ flexBasis: "90%" }}>
                        {attribute.name + ":"}
                      </span>
                      <span style={{ flexBasis: "10%" }}>
                        {attribute.value}
                      </span>
                    </div>
                  ) : (
                    <>
                      <AttributeEdit
                        value={attribute.name}
                        id={`${attribute.name}-name`}
                        placeholder={`${type.substring(0, type.length - 1)}`}
                        onChange={(e) =>
                          handleChangeStats(e, statsIndex, statIndex)
                        }
                      />
                      <AttributeValueEdit
                        value={attribute.value}
                        id={`${attribute.name}-value`}
                        onChange={(e) =>
                          handleChangeStats(e, statsIndex, statIndex)
                        }
                      />
                    </>
                  )}

                  <Delete
                    style={{ display: !hookIndex[statsIndex] && "none" }}
                    onClick={() => handleDeleteStat(statsIndex, statIndex)}
                  />
                </Attribute>
              ))}
              <Create
                style={{
                  display:
                    (hookIndex[statsIndex] && "block") ||
                    (stats[statsIndex].length === 0 && "block"),
                }}
                onClick={() => handleCreateStat(statsIndex, type)}
              />
            </Attributes>
          </AttributesContainer>
        );
      })}
    </Wrapper>
  );
};

export default Stats;
