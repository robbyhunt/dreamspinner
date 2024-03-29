import React from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  width: 150px;
  height: 35px;
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  position: absolute;
  border-radius: 8px 8px 0 0;
  bottom: -1px;
  right: ${(props) => props.position};
  z-index: 10;
  transition: 200ms;
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ffffff;
  opacity: ${(props) => (props.isopen ? "0.8" : "1")};
`;

const Title = Styled("p")`
  margin: 8px 0 10px;
  letter-spacing: 5px;
  cursor: pointer;
`;

function Settings({ isOpen, handleToggle, title, position }) {
  return (
    <Wrapper isopen={isOpen} position={position}>
      <Title onClick={() => handleToggle(!isOpen)}>{title}</Title>
    </Wrapper>
  );
}

export default Settings;
