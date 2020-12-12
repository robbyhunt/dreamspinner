import React from 'react';
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  width: ${props => props.notesOpen ? "50%" : "150px"};
  height: ${props => props.notesOpen ? "380px" : "35px"};
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  position: absolute;
  border-radius: 8px;
  bottom: -10px;
  left: 25px;
  z-index: 10;
  transition: ease-in-out	400ms;
  filter: ${props => props.notesOpen ? "drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))" : "none"};
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ffffff;
`;

const Title = Styled('p')`
  margin: 4px 0 10px;
  letter-spacing: 5px;
  cursor: pointer;
`;

const NotesArea = Styled('textarea')`
  height: calc(100% - 80px);
  width: calc(100% - 30px);
  pointer-events: initial;
  outline: none;
  padding: 10px;
  font-size: 16px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

function Notes({startOpen, notesOpen, openNotes}) {

  return (
    <Wrapper startOpen={startOpen} notesOpen={notesOpen}>
      <Title onClick={openNotes}>NOTES</Title>
      <NotesArea name="notesarea" id="notesarea"/>
    </Wrapper>
  );
}

export default Notes;
