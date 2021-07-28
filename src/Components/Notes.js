import React from 'react';
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  width: ${props => props.notesOpen ? "50%" : "150px"};
  max-width: 400px;
  height: ${props => props.notesOpen ? "50%" : "35px"};
  max-height: 800px;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  position: absolute;
  border-radius: 8px;
  bottom: -10px;
  left: ${props => props.position};
  z-index: ${props => props.notesOpen ? "11" : "10"};
  transition: height ease-in-out 300ms, width ease-in-out 300ms 200ms;
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
  font-size: 18px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

function Notes({startOpen, notesOpen, openNotes, position="25px", title}) {

  return (
    <Wrapper startOpen={startOpen} notesOpen={notesOpen} position={position}>
      <Title onClick={openNotes}>{title.toUpperCase()}</Title>
      <NotesArea name={title} id={title} />
    </Wrapper>
  );
}

export default Notes;
