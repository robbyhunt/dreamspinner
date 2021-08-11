import React, { useState } from "react";
import Styled from "@emotion/styled";
// import { useSelector } from "react-redux";

import Dialog from "../common/Dialog";
import ResizableContainer from "../common/ResizableContainer";

import Search from "./Search";
import Saved from "./Saved";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
`;

const TabContainer = Styled("div")`
  position: absolute;
  top: 60px;
  right: -99px;
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
  margin-bottom: 40px;
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

const Inspiration = ({ hook }) => {
  const [activeTab, setActiveTab] = useState(0);

  const initialLeft =
    document.documentElement.clientWidth > 1000
      ? "calc(80vw - 40vw)"
      : "calc(80vw - 350px)";

  return (
    <Dialog
      title="Inspiration"
      onClose={hook[1]}
      initialPosition={{ top: "15vh", left: initialLeft }}
    >
      <ResizableContainer
        minSize={{ width: "350px", height: "450px" }}
        maxSize={{ width: "1100px", height: "90vh" }}
        initialSize={{ width: "30vw", height: "55vh" }}
      >
        <Wrapper>{activeTab === 0 ? <Search /> : <Saved />}</Wrapper>
      </ResizableContainer>
      <TabContainer>
        <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          Search
        </Tab>
        <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          Saved
        </Tab>
      </TabContainer>
    </Dialog>
  );
};

export default Inspiration;
