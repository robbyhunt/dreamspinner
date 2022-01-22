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
  padding: ${(props) => (props.iseditable ? "0" : "0 10px")};
  width: ${(props) => (props.iseditable ? "100%" : "calc(100% - 20px)")};
  height: 27px;
  position: relative;
  
  & > span {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const TitleBar = Styled("div")`
  margin: 0;
  text-align: left;
  font-size: 20px;
  background-color: #000000;
  color: #ffffff;
  width: calc(100% - 20px);
  padding: 0 10px;
  max-width: 680px;
  position: relative
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

const Delete = Styled(Edit)`
  top: 2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background-image: url(${DeleteIcon});
`;

const TextEdit = Styled("textarea")`
  resize: none;
  height: calc(100% - 5px);
  width: 100%;
  padding: 5px 0 0 5px;
  outline: none;
  border: 1px solid #efefefef;
  background-color: rgba(0,0,0,0);

  :focus {
    outline: none;
    border: 1px solid #efefefef;
  }
`;

const Inventory = ({ inventory, sheetIndex }) => {
  const [isEditable, setIsEditable] = useState(false);

  const { characters } = useSelector((s) => s);
  const dispatch = useDispatch();

  const handleChange = (e, index) => {
    let tempData = [...characters];
    tempData[sheetIndex].inventory[index] = e.target.value;

    dispatch(changeCharacters(tempData));
  };

  const handleCreate = () => {
    setIsEditable(true);

    let tempData = [...characters];
    tempData[sheetIndex].inventory.push("");

    dispatch(changeCharacters(tempData));
  };

  const handleDelete = (index) => {
    let tempData = [...characters];
    tempData[sheetIndex].inventory.splice(index, 1);

    dispatch(changeCharacters(tempData));
  };

  return (
    <>
      <TitleBar>
        Inventory:
        <Edit onClick={() => setIsEditable(!isEditable)} />
      </TitleBar>
      <Wrapper>
        <AttributesContainer>
          <Attributes>
            {inventory.map((item, index) => (
              <Attribute key={index} index={index} iseditable={isEditable}>
                {isEditable ? (
                  <>
                    <TextEdit
                      value={item}
                      id={`inventory-${index}`}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <Delete
                      style={{ display: !isEditable && "none" }}
                      onClick={() => handleDelete(index)}
                    />
                  </>
                ) : (
                  <span>{item}</span>
                )}
              </Attribute>
            ))}
            <Create
              style={{
                display:
                  (isEditable && "block") ||
                  (inventory.length === 0 && "block"),
              }}
              onClick={() => handleCreate()}
            />
          </Attributes>
        </AttributesContainer>
      </Wrapper>
    </>
  );
};

export default Inventory;
