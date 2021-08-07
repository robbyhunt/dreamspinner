import React, { useState } from "react";
import Styled from "@emotion/styled";

import CreateIcon from "../../img/icons/create.svg";
import EditIcon from "../../img/icons/edit-white.svg";
import DeleteIcon from "../../img/icons/close-black.svg";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Container = Styled("div")`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

const EquipmentTable = Styled("div")`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Item = Styled("div")`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.index % 2 !== 0 ? "#dddddd" : "none")};
  width: ${(props) => (props.iseditable ? "100%" : "calc(100% - 20px)")};
  height: 27px;
  padding: ${(props) => (props.iseditable ? "0" : "0 10px")};
  position: relative;
  
  & > span {
    font-size: 20px;
    overflow: hidden;

    :last-of-type {
      margin-right: 0;
    }
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
  display: flex;
  position: relative;
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

const EquipmentEdit = Styled("textarea")`
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

const Delete = Styled(Edit)`
  top: 2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background-image: url(${DeleteIcon});
`;

const Equipment = ({ equipment, sheetIndex, hook }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e, index) => {
    const setData = hook[1];
    let tempData = [...hook[0]];

    if (e.target.id.includes("name")) {
      tempData[sheetIndex].equipment[index].name = e.target.value;
    } else if (e.target.id.includes("[2]")) {
      tempData[sheetIndex].equipment[index][2] = e.target.value;
    } else if (e.target.id.includes("[3]")) {
      tempData[sheetIndex].equipment[index][3] = e.target.value;
    } else if (e.target.id.includes("notes")) {
      tempData[sheetIndex].equipment[index].notes = e.target.value;
    }

    setData(tempData);
  };

  const handleCreate = () => {
    const setData = hook[1];
    let tempData = [...hook[0]];
    tempData[sheetIndex].equipment.push({ name: "", 2: "", 3: "", notes: "" });

    setData(tempData);
  };

  const handleDelete = (index) => {
    const setData = hook[1];
    let tempData = [...hook[0]];
    tempData[sheetIndex].equipment.splice(index, 1);

    setData(tempData);
  };

  return (
    <>
      <TitleBar>
        <span style={{ flexBasis: "40%" }}>Equipment:</span>
        <span style={{ flexBasis: "20%" }}>DMG/DEF:</span>
        <span style={{ flexBasis: "10%" }}>Range:</span>
        <span style={{ flexBasis: "30%" }}>Notes:</span>
        <Edit onClick={() => setIsEditable(!isEditable)} />
      </TitleBar>
      <Wrapper>
        <Container>
          <EquipmentTable>
            {equipment.map((item, index) => (
              <Item key={index} index={index} iseditable={isEditable}>
                {isEditable ? (
                  <>
                    <EquipmentEdit
                      style={{ flexBasis: "4" }}
                      value={item.name}
                      id={`equipment-name-${index}`}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <EquipmentEdit
                      style={{ flexBasis: "2" }}
                      value={item[2]}
                      id={`equipment-[2]-${index}`}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <EquipmentEdit
                      style={{ flexBasis: "1" }}
                      value={item[3]}
                      id={`equipment-[3]-${index}`}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <EquipmentEdit
                      style={{ flexBasis: "3" }}
                      value={item.notes}
                      id={`equipment-notes-${index}`}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <Delete
                      style={{ display: !isEditable && "none" }}
                      onClick={() => handleDelete(index)}
                    />
                  </>
                ) : (
                  <>
                    <span style={{ flexBasis: "40%" }}>{item.name}</span>
                    <span style={{ flexBasis: "20%" }}>{item[2]}</span>
                    <span style={{ flexBasis: "10%" }}>{item[3]}</span>
                    <span style={{ flexBasis: "30%" }}>
                      <span style={{ whiteSpace: "nowrap" }}>{item.notes}</span>
                    </span>
                  </>
                )}
              </Item>
            ))}
            <Create
              style={{ display: !isEditable && "none" }}
              onClick={() => handleCreate()}
            />
          </EquipmentTable>
        </Container>
      </Wrapper>
    </>
  );
};

export default Equipment;
