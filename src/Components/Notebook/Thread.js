import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";

import EditIcon from "../../img/icons/edit.svg";
import DeleteIcon from "../../img/icons/delete.svg";
import ConfirmIcon from "../../img/icons/confirm.svg";
import CloseThreadIcon from "../../img/icons/close-thread.svg";

const Wrapper = Styled("div")`
  width: calc(100% - 20px);
  margin: 5px 0;
  position: relative;
  text-align: left;
`;

const Edit = Styled("div")`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0.7;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: url(${EditIcon});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  
  :hover {
    opacity: 1;
  }
`;

const Title = Styled("div")`
  opacity: ${(props) => (props.isopen ? "0.7" : "1")};
  padding: ${(props) =>
    props.iseditable ? "10px 42px 5px 10px" : "10px 42px 10px 10px"};
  background-color: #efefefef;
  border-radius: ${(props) => (props.isopen ? "5px 5px 0 0" : "5px")};
  cursor: ${(props) => (props.iseditable ? "auto" : "pointer")};
  min-height: 25px;
  font-size: 18px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    opacity: ${(props) => (props.iseditable ? "1" : "0.6")};
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
  top: 32px;
  background-image: url(${DeleteIcon});
`;

const Confirm = Styled(Edit)`
  background-image: url(${ConfirmIcon});
`;

const Close = Styled(Edit)`
  background-image: url(${CloseThreadIcon});
  top: 25px;
  right: 6px;
`;

const Thread = ({ item, index, updateThread, deleteThread, restoreThread }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (item.title === "") {
      setIsEditable(true);
    }
  }, [item.title]);

  useEffect(() => {
    if (isEditable) {
      document.getElementById(`titleEdit-${index}`).focus();
    }
  }, [isEditable, index]);

  const changeThread = (e) => {
    let tempData = { ...item };
    if (e.target.id.includes("titleEdit")) {
      tempData.title = e.target.value;
    } else if (e.target.id.includes("descriptionEdit")) {
      tempData.description = e.target.value;
    } else if (e.target.id.includes("closeThread")) {
      tempData.isClosed = true;
    } else if (e.target.id.includes("recoverThread")) {
      tempData.isClosed = false;
      restoreThread(index);
    }
    updateThread(index, tempData);
  };

  const handleDelete = () => {
    setIsEditable(false);
    deleteThread(index);
  };

  return (
    <Wrapper style={{ opacity: item.isClosed && 0.5 }}>
      <Title
        isopen={isOpen}
        iseditable={isEditable}
        onClick={() => !isEditable && setIsOpen(!isOpen)}
      >
        {isEditable ? (
          <TitleEdit
            value={item.title}
            id={`titleEdit-${index}`}
            onChange={changeThread}
            placeholder="Enter a title..."
          />
        ) : item.title !== "" ? (
          "- " + item.title
        ) : (
          " "
        )}
      </Title>
      {!isEditable ? (
        <>
          <Edit onClick={() => setIsEditable(true)} />
          {item.isClosed ? (
            <Close id="recoverThread" onClick={(e) => changeThread(e)} />
          ) : (
            <Close id="closeThread" onClick={(e) => changeThread(e)} />
          )}
        </>
      ) : (
        <>
          <Confirm onClick={() => setIsEditable(false)} />
          <Delete onClick={() => handleDelete()} />
        </>
      )}
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
