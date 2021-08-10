import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";
import CloseIcon from "../../img/icons/close-black.svg";

const Modal = Styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100;
  transition: 400ms;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const Inner = Styled("div")`
  width: calc(100% - 60px);
  max-height: 100%;
  background-color: #ffffff;
  transition: 400ms;
  padding: 25px 10px 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  border-radius: 5px;
`;

const CloseButton = Styled("div")`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.8;
  transition: 200ms;
  background-image: url(${CloseIcon});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  height: 6px;
  width: 6px;

  :hover {
    opacity: 1;
  }
`;

function Confirmation({ handleClose, children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const Close = () => {
    setIsOpen(false);
    setTimeout(function () {
      handleClose();
    }, 500);
  };

  return (
    <Modal
      style={{
        opacity: isOpen ? "1" : "0",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <Inner
        style={{
          opacity: isOpen ? "1" : "0",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <CloseButton onClick={() => Close()} />
        {children}
      </Inner>
    </Modal>
  );
}

export default Confirmation;
