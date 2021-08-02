import React from "react";
import Styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { changeThreads } from "../../actionCreators";

import CreateIcon from "../../img/icons/create.svg";
import Thread from "./Thread";

const Wrapper = Styled("div")`
  width: calc(100% - 5px);
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
  overflow: scroll;
  font-family: "Patrick Hand";

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
`;

const Create = Styled("div")`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.6;
  background-image: url(${CreateIcon});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  
  :hover {
    opacity: 1;
  }
`;

const Threads = ({ data }) => {
  const dispatch = useDispatch();

  const createThread = () => {
    let tempData = [...data];
    tempData.push({ title: "", description: "" });
    dispatch(changeThreads(tempData));
  };

  const deleteThread = (index) => {
    let tempData = [...data];
    tempData.splice(index, 1);
    dispatch(changeThreads(tempData));
  };

  const updateThread = (index, newThreadData) => {
    let tempData = [...data];
    tempData[index] = newThreadData;
    dispatch(changeThreads(tempData));
  };

  return (
    <Wrapper>
      <Create onClick={createThread} />
      {!data[0] ? (
        <span style={{ opacity: 0.55, marginTop: 10 }}>
          You don't have any threads yet...
        </span>
      ) : (
        data.map((item, index) => (
          <Thread
            key={index}
            index={index}
            item={item}
            updateThread={updateThread}
            deleteThread={deleteThread}
          />
        ))
      )}
    </Wrapper>
  );
};

export default Threads;
