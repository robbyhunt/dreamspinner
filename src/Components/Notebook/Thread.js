import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  width: 90%;
  margin: 5px 0;
  position: relative;
  text-align: left;
`;

const Edit = Styled("div")`
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 5px;
  opacity: 0.6;
  
  :hover {
    opacity: 1;
  }
`;

const Title = Styled("div")`
  opacity: ${(props) => (props.isopen ? "0.7" : "1")};
  padding: ${(props) =>
    props.iseditable ? "10px 50px 5px 10px" : "10px 50px 10px 10px"};
  background-color: #efefefef;
  border-radius: ${(props) => (props.isopen ? "5px 5px 0 0" : "5px")};
  cursor: pointer;
  min-height: 25px;
  font-size: 18px;

  :hover {
    opacity: 0.6;
  }
`;

const Inner = Styled("div")`
  border-radius: 0 0 5px 5px;
  border: 2px solid rgba(239,239,239,0.7);
  border-top: none;
`;

const TextArea = Styled("textarea")`
  width: calc(100% - 20px);
  outline: none;
  border: none;
  font-size: 16px;
  resize: vertical;
  height: 100px;
  padding: 10px;
  border-radius: 0 0 5px 5px;

  ::-webkit-scrollbar {
    width: 5px;
  }
 
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #376d99;
  }
  
  :focus {
    outline: none;
  }
`;

const TitleEdit = Styled(TextArea)`
  height: 25px;
  resize: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px;
`;

const Delete = Styled(Edit)`
  top: 20px;
`;

const Thread = ({ item, index, updateThread, deleteThread }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (item.title !== "") {
      setIsEditable(false);
    }
  }, []);

  const changeThread = (e) => {
    let tempData = { ...item };
    if (e.target.id === "titleEdit") {
      tempData.title = e.target.value;
    } else if (e.target.id === "descriptionEdit") {
      tempData.description = e.target.value;
    }
    updateThread(index, tempData);
  };

  return (
    <Wrapper>
      <Title
        isopen={isOpen}
        iseditable={isEditable}
        onClick={() => !isEditable && setIsOpen(!isOpen)}
      >
        {isEditable ? (
          <TitleEdit
            value={item.title}
            id="titleEdit"
            onChange={changeThread}
          />
        ) : item.title !== "" ? (
          "- " + item.title
        ) : (
          " "
        )}
      </Title>
      <Edit onClick={() => setIsEditable(!isEditable)}>
        {!isEditable ? "Edit" : "Confirm"}
      </Edit>
      <Delete onClick={() => deleteThread(index)}>Delete</Delete>
      {isOpen && (
        <Inner>
          <TextArea
            value={item.description}
            id="descriptionEdit"
            onChange={changeThread}
          />
        </Inner>
      )}
    </Wrapper>
  );
};

export default Thread;
