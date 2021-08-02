import React, { useEffect, useState } from "react";
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
  const [closedThreads, setClosedThreads] = useState([]);

  useEffect(() => {
    let tempClosedThreads = [];
    data.map((item) => {
      if (item.isClosed) {
        tempClosedThreads.push(item);
      } else {
        tempClosedThreads.push({});
      }
      return tempClosedThreads;
    });
    setClosedThreads(tempClosedThreads);
  }, [data]);

  const dispatch = useDispatch();

  const createThread = () => {
    let tempData = [...data];
    tempData.push({
      title: "",
      description: "",
      isClosed: false,
    });
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

  const restoreThread = (index) => {
    setClosedThreads(closedThreads.slice(index, 1));
  };

  return (
    <Wrapper>
      <Create onClick={createThread} />
      {!data[0] ? (
        <span style={{ opacity: 0.55, marginTop: 10 }}>
          You don't have any threads yet...
        </span>
      ) : (
        data.map((item, index) => {
          if (item.isClosed) {
            return null;
          }
          return (
            <Thread
              key={index}
              index={index}
              item={item}
              updateThread={updateThread}
              deleteThread={deleteThread}
              restoreThread={restoreThread}
            />
          );
        })
      )}
      {closedThreads[0] &&
        closedThreads.map((item, index) => {
          if (item.isClosed) {
            return (
              <Thread
                key={index}
                index={index}
                item={item}
                updateThread={updateThread}
                deleteThread={deleteThread}
                restoreThread={restoreThread}
              />
            );
          } else return null;
        })}
    </Wrapper>
  );
};

export default Threads;
