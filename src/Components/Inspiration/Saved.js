import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector } from "react-redux";

import ModalWithChildren from "../common/ModalWithChildren";

const Container = Styled("div")`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 20px);
  margin-top: 20px;
`;

const ImageContainer = Styled("div")`
  flex: 1;
  min-width: 150px;
  height: 200px;
  background-image: ${(props) => `url(${props.result})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px dashed #dddddd;
  border-radius: 2px;
  margin: 0 5px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const Saved = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const { inspiration } = useSelector((s) => s);

  const openModal = async (index) => {
    await setModalImage(inspiration[index].thumbnailUrl);
    setModalOpen(true);
  };

  return (
    <Container>
      {inspiration.map((item, index) => (
        <ImageContainer
          key={index}
          result={item.thumbnailUrl}
          onClick={() => openModal(index)}
        />
      ))}

      {modalOpen && (
        <ModalWithChildren
          handleClose={() => {
            setModalOpen(false);
          }}
        >
          <img src={modalImage} alt="" />
        </ModalWithChildren>
      )}
    </Container>
  );
};

export default Saved;
