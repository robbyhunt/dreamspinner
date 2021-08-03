import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";

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
  max-width: 400px;
  background-color: #ffffff;
  transition: 400ms;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 15px;
  text-align: center;
  border-radius: 5px;
`;

const Title = Styled("p")`
  margin: 0 0 10px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 2px;
`;

const SubTitle = Styled(Title)`
  font-size: 16px;
  letter-spacing: 0.5px;
  text-transform: none;
  font-weight: 300;
  margin: 0 0 30px;
`;

const ButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-around;
`;

const Button = Styled("button")`
  color: ${(props) =>
    props.id === "cancel" ? "#ffffff" : props.theme.colors.primary};
  padding: 10px 25px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.id === "cancel" ? "#ff0101" : "#ffffff"};
  border-radius: 5px;
  border: ${(props) =>
    props.id === "cancel"
      ? "2px solid #ff0101"
      : `2px solid ${props.theme.colors.primary}`};
  text-transform: uppercase;
  user-select: none;
  transition: opacity 200ms;
  letter-spacing: 1px;
  opacity: 1;

  &:hover {
    opacity: 0.6;
  }
`;

function Confirmation({ title, subTitle, onCancel, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const confirm = () => {
    onConfirm();
    cancel();
  };

  const cancel = () => {
    setIsOpen(false);
    setTimeout(function () {
      onCancel();
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
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <ButtonWrapper>
          <Button onClick={cancel} id="cancel">
            Cancel
          </Button>
          <Button onClick={confirm}>Confirm</Button>
        </ButtonWrapper>
      </Inner>
    </Modal>
  );
}

export default Confirmation;
