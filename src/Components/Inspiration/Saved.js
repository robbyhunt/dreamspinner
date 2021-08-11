import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { changeInspiration } from "../../actionCreators";

import ModalWithChildren from "../common/ModalWithChildren";
import DeleteIcon from "../../img/icons/delete.svg";

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
  transition: 200ms;
  position: relative;

  :hover {
    opacity: 0.8;
  }
`;

const DeleteButton = Styled("div")`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 8px;
  cursor: pointer;
  opacity: 0.8;
  background-color: #ffffff;
  transition: 200ms;
  background-image: url(${DeleteIcon});
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 2px;
  height: 6px;
  width: 6px;

  :hover {
    opacity: 1;
  }
`;

const Saved = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const { inspiration } = useSelector((s) => s);
  const dispatch = useDispatch();

  const openModal = async (index) => {
    await setModalImage(inspiration[index].thumbnailUrl);
    setModalOpen(true);
  };

  const handleDelete = async (index) => {
    let tempData = [...inspiration];
    tempData.splice(index, 1);

    dispatch(changeInspiration(tempData));

    setTimeout(function () {
      setModalOpen(false);
    }, 10);
  };

  return (
    <Container>
      {inspiration[0] ? (
        inspiration.map((item, index) => (
          <ImageContainer
            key={index}
            result={item.thumbnailUrl}
            onClick={() => openModal(index)}
          >
            <DeleteButton onClick={() => handleDelete(index)} />
          </ImageContainer>
        ))
      ) : (
        <span style={{ opacity: 0.55, marginTop: 10, width: "100%" }}>
          You don't have any saved images yet...
        </span>
      )}

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
