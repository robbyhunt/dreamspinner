import React, { useEffect, useState } from "react";
import Styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { changeThreads, addToLog } from "../../actionCreators";

import CreateIcon from "../../img/icons/create.svg";
import Thread from "./Thread";
import Confirmation from "../common/Confirmation";

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

const ToggleLogging = Styled("button")`
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #dddddd;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  opacity: ${(props) => (props.logging ? "1" : "0.7")};

  :focus {
    outline: none;
  }
  
  :hover {
    opacity: ${(props) => (props.logging ? "0.7" : "0.5")};
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

const Threads = ({ data, loggingChanges, setLoggingChanges }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletePayload, setDeletePayload] = useState(undefined);
  const [closedThreads, setClosedThreads] = useState([]);
  const [editingNew, setEditingNew] = useState(false);

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

  const logChange = async (type, index) => {
    if (loggingChanges) {
      let string = "";
      let title = await data[index].title;
      switch (type) {
        case "create":
          string = ` > [New Thread]:  ${title}`;
          break;
        case "update":
          string = ` > [Changed Thread]: ${title}`;
          break;
        case "close":
          string = ` > [Closed Thread]: ${title}`;
          break;
        case "restore":
          string = ` > [Restored Thread]: ${title}`;
          break;

        default:
          break;
      }
      dispatch(addToLog(string));
    }

    setEditingNew(false);
  };

  const createThread = () => {
    setEditingNew(true);
    let tempData = [...data];
    tempData.push({
      title: "",
      description: "",
      isClosed: false,
    });
    dispatch(changeThreads(tempData));
  };

  const confirmDeleteThread = (index) => {
    setDeletePayload(index);
    if (data[index].title === "" && data[index].description === "") {
      deleteThread();
    } else {
      setDeleteConfirmation(true);
    }
  };

  const deleteThread = () => {
    let tempData = [...data];
    tempData.splice(deletePayload, 1);
    dispatch(changeThreads(tempData));

    if (!data[deletePayload].isClosed) {
      logChange("close", deletePayload);
    }
  };

  const updateThread = (index, newThreadData) => {
    let tempData = [...data];
    tempData[index] = newThreadData;
    dispatch(changeThreads(tempData));
  };

  const restoreThread = (index) => {
    setClosedThreads(closedThreads.slice(index, 1));

    logChange("restore", index);
  };

  return (
    <>
      <Wrapper>
        <ToggleLogging
          logging={loggingChanges}
          onClick={() => setLoggingChanges(!loggingChanges)}
        >
          Logging Changes: {`${loggingChanges}`}
        </ToggleLogging>
        <Create onClick={() => createThread()} />
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
                deleteThread={confirmDeleteThread}
                logChange={logChange}
                editingNew={editingNew}
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
                  deleteThread={confirmDeleteThread}
                  restoreThread={restoreThread}
                />
              );
            } else return null;
          })}
      </Wrapper>

      {deleteConfirmation && (
        <Confirmation
          title="Are you sure you want to delete this thread?"
          subTitle="This will wipe its data and cannot be undone."
          isOpen={deleteConfirmation}
          onCancel={() => setDeleteConfirmation(false)}
          onConfirm={deleteThread}
        />
      )}
    </>
  );
};

export default Threads;
