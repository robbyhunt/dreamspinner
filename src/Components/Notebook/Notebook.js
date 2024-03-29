import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { changeNotes, changeNPCs } from "../../actionCreators";

import Dialog from "../common/Dialog";
import ResizableContainer from "../common/ResizableContainer";

import Notes from "./Notes";
import Threads from "./Threads";
import NPCs from "./NPCs";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
`;

const TabContainer = Styled("div")`
  position: absolute;
  top: 60px;
  right: -108px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 800px) {
    z-index: 11;
    right: -90px;
    top: 100px;
  }
`;

const Tab = Styled("div")`
  transform-origin: 0 0;
  transform: ${(props) =>
    props.isActive ? "rotate(90deg) translateY(-5px)" : "rotate(90deg)"};
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px 10px 0 0;
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  color: #ffffff;
  padding: 5px 10px 15px;
  cursor: pointer;
  user-select: none;
  transition: 200ms;

  -webkit-user-select: none;
  -ms-user-select: none;

  @media (max-width: 800px) {
    width: 60px;
    transform: ${(props) =>
      props.isActive ? "rotate(90deg) translateY(7px)" : "rotate(90deg)"};
    border-radius: 0 0 10px 10px;
    padding: 10px 10px 10px;
  }
`;

const Notebook = ({ hook }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loggingThreadChanges, setLoggingThreadChanges] = useState(true);
  const [loggingNPCChanges, setLoggingNPCChanges] = useState(true);

  const { notes, threads, npcs } = useSelector((s) => s);
  const dispatch = useDispatch();

  const onChange = (e) => {
    switch (e.target.id) {
      case "notes":
        dispatch(changeNotes(e.target.value));
        break;
      case "npcs":
        dispatch(changeNPCs(e.target.value));
        break;

      default:
        break;
    }
  };

  const initialLeft =
    document.documentElement.clientWidth > 1200
      ? "calc(95vw - 20vw)"
      : "calc(95vw - 250px)";

  return (
    <Dialog
      title="Notebook"
      onClose={hook[1]}
      initialPosition={{ top: "10vh", left: initialLeft }}
    >
      <ResizableContainer
        minSize={{ width: "250px", height: "300px" }}
        maxSize={{ width: "40vw", height: "90vh" }}
        initialSize={{ width: "20vw", height: "50vh" }}
      >
        <Wrapper>
          {activeTab === 0 ? (
            <Notes data={notes} onChange={onChange} />
          ) : activeTab === 1 ? (
            <Threads
              data={threads}
              loggingChanges={loggingThreadChanges}
              setLoggingChanges={setLoggingThreadChanges}
            />
          ) : activeTab === 2 ? (
            <NPCs
              data={npcs}
              onChange={onChange}
              loggingChanges={loggingNPCChanges}
              setLoggingChanges={setLoggingNPCChanges}
            />
          ) : null}
        </Wrapper>
      </ResizableContainer>
      <TabContainer>
        <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          Notes
        </Tab>
        <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          Threads
        </Tab>
        <Tab onClick={() => setActiveTab(2)} isActive={activeTab === 2}>
          NPCs
        </Tab>
      </TabContainer>
    </Dialog>
  );
};

export default Notebook;
