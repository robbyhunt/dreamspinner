import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeCharacters } from "../../actionCreators";

import Styled from "@emotion/styled";

import CreateIcon from "../../img/icons/create.svg";
import EditIcon from "../../img/icons/edit-white.svg";
import DeleteIcon from "../../img/icons/close-black.svg";

const Wrapper = Styled("div")`
  width: 100%;
`;

const TitleBar = Styled("div")`
  margin: 0;
  text-align: left;
  font-size: 20px;
  background-color: #000000;
  color: #ffffff;
  width: calc(100% - 10px);
  padding: 0 5px;
  position: relative;
`;

const Resource = Styled("div")`
  width: 100%;
  text-align: left;
  position: relative;

  & > div {
    height: 22px;
  }
`;

const ResourceBar = Styled("div")`
  width: 100%;
  height: 20px;
  background-color: rgba(0,0,0,0.15);
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  position: relative;
`;

const ResourceFill = Styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) =>
    props.reversed
      ? `${100 - props.percentfilled}%`
      : `${props.percentfilled}%`};
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.color}};
`;

const ResourceValues = Styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & > span {
    cursor: pointer;
    margin-bottom: 6px;
    font-size: 22px;
    transition: 200ms;

    :hover {
      opacity: 0.7;
    }
  }
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
  margin-top: 10px;
  
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

const ResourceEdit = Styled("textarea")`
  resize: none;
  height: 100%;
  width: 50%;
  padding: 0 5px;
  outline: none;
  border: 1px solid #efefefef;
  background-color: rgba(0,0,0,0);

  :focus {
    outline: none;
    border: 1px solid #efefefef;
  }
`;

const ValueEdit = Styled(ResourceEdit)`
  height: 20px;
  width: 20px;
  margin-top: 4px;
  color: #ffffff;
`;

const Delete = Styled(Edit)`
  top: 0;
  right: 5px;
  width: 8px;
  height: 8px;
  background-image: url(${DeleteIcon});
`;

const Resources = ({ resources, hook, sheetIndex }) => {
  const [isEditable, setIsEditable] = useState(false);

  const { characters } = useSelector((s) => s);
  const dispatch = useDispatch();

  const handleCreate = () => {
    let tempData = [...characters];
    tempData[sheetIndex].resources.push({
      name: "",
      value: 1,
      maxValue: 1,
      color: "#d54e4e",
      reversed: false,
    });

    dispatch(changeCharacters(tempData));
  };

  const handleChange = (e, index) => {
    let tempData = [...characters];

    if (e.target.id.includes("name")) {
      tempData[sheetIndex].resources[index].name = e.target.value;
    } else if (e.target.id.includes("color")) {
      tempData[sheetIndex].resources[index].color = e.target.value;
    } else if (e.target.id.includes("value")) {
      if (e.target.value === "") {
        tempData[sheetIndex].resources[index].value = 0;
      } else if (
        e.target.value > tempData[sheetIndex].resources[index].maxValue
      ) {
        tempData[sheetIndex].resources[index].value =
          tempData[sheetIndex].resources[index].maxValue;
      } else {
        tempData[sheetIndex].resources[index].value = parseInt(e.target.value);
      }
    } else if (e.target.id.includes("max")) {
      if (e.target.value === "") {
        tempData[sheetIndex].resources[index].value = 0;
      } else {
        tempData[sheetIndex].resources[index].maxValue = parseInt(
          e.target.value
        );
      }
    } else if (e.target.id.includes("reverse")) {
      tempData[sheetIndex].resources[index].reversed =
        !tempData[sheetIndex].resources[index].reversed;
    } else if (e.target.id.includes("minus")) {
      if (tempData[sheetIndex].resources[index].value === 0) {
        return;
      } else {
        tempData[sheetIndex].resources[index].value =
          tempData[sheetIndex].resources[index].value - 1;
      }
    } else if (e.target.id.includes("plus")) {
      if (
        tempData[sheetIndex].resources[index].value ===
        tempData[sheetIndex].resources[index].maxValue
      ) {
        return;
      } else {
        tempData[sheetIndex].resources[index].value =
          tempData[sheetIndex].resources[index].value + 1;
      }
    }

    dispatch(changeCharacters(tempData));
  };

  const handleDelete = (index) => {
    let tempData = [...characters];
    tempData[sheetIndex].resources.splice(index, 1);

    dispatch(changeCharacters(tempData));
  };

  return (
    <Wrapper>
      <TitleBar>
        Resources:
        <Edit onClick={() => setIsEditable(!isEditable)} />
      </TitleBar>
      {resources.map((resource, index) => (
        <Resource key={index}>
          <div>
            {isEditable ? (
              <>
                <ResourceEdit
                  value={resource.name}
                  id={`resource-name-${index}`}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Name"
                />
                <ResourceEdit
                  value={resource.color}
                  id={`resource-color-${index}`}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Hex"
                  style={{
                    textAlign: "right",
                    width: "25%",
                  }}
                />
              </>
            ) : (
              <span>{resource.name}:</span>
            )}
          </div>
          <ResourceBar>
            <ResourceFill
              percentfilled={(resource.value / resource.maxValue) * 100}
              color={resource.color}
              reversed={resource.reversed}
            />
            <ResourceValues>
              <span
                id={`resource-minus-${index}`}
                onClick={(e) => handleChange(e, index)}
                style={{ display: isEditable && "none" }}
              >
                -
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {isEditable ? (
                  <>
                    <ValueEdit
                      value={resource.value}
                      id={`resource-value-${index}`}
                      onChange={(e) => handleChange(e, index)}
                      style={{ marginRight: 5 }}
                      placeholder="Cur"
                    />
                    {" / "}
                    <ValueEdit
                      value={resource.maxValue}
                      id={`resource-max-${index}`}
                      onChange={(e) => handleChange(e, index)}
                      style={{ marginLeft: 5 }}
                      placeholder="Max"
                    />
                    <button
                      id={`resource-reverse-${index}`}
                      onClick={(e) => handleChange(e, index)}
                      style={{
                        fontSize: 10,
                      }}
                    >
                      {resource.reversed ? "Unreverse" : "Reverse"}
                    </button>
                  </>
                ) : (
                  <>
                    <span>{resource.value}</span>
                    <span>{" / "}</span>
                    <span>{resource.maxValue}</span>
                  </>
                )}
              </div>
              <span
                id={`resource-plus-${index}`}
                onClick={(e) => handleChange(e, index)}
                style={{ display: isEditable && "none" }}
              >
                +
              </span>
            </ResourceValues>
          </ResourceBar>
          <Delete
            style={{ display: !isEditable && "none" }}
            onClick={() => handleDelete(index)}
          />
        </Resource>
      ))}

      <Create
        style={{ display: !isEditable && "none" }}
        onClick={() => handleCreate()}
      />
    </Wrapper>
  );
};

export default Resources;
