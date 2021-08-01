import React from "react";
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
`;

const Inner = Styled("div")`
  background-color: #ffffff;
  transition: 400ms;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 15px;
  text-align: center;
`;

const Title = Styled("p")`
  margin: 0 0 20px;
  font-size: 22px;
`;

const SubTitle = Styled(Title)`
  font-size: 18px;
`;

const ButtonWrapper = Styled("div")`
  display: flex;
  justify-content: space-around;
`;

function Confirmation({ title, subTitle, onCancel, onConfirm, isOpen }) {
  const confirm = () => {
    onCancel();
    onConfirm();
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
          <button onClick={onCancel}>Cancel</button>
          <button onClick={confirm}>Confirm</button>
        </ButtonWrapper>
      </Inner>
    </Modal>
  );
}

export default Confirmation;
