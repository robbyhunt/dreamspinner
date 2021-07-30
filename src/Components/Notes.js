import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { changeNotes, changeThreads, changeNPCs } from "../actionCreators";

const Wrapper = Styled("div")`
  width: ${(props) => (props.notesOpen ? "50%" : "150px")};
  max-width: 400px;
  height: ${(props) => (props.notesOpen ? "50%" : "35px")};
  max-height: 800px;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  position: absolute;
  border-radius: 8px;
  bottom: -10px;
  left: ${(props) => props.position};
  z-index: ${(props) => (props.notesOpen ? "11" : "10")};
  transition: height ease-in-out 300ms, width ease-in-out 300ms 200ms;
  filter: ${(props) =>
    props.notesOpen ? "drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))" : "none"};
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ffffff;
`;

const Title = Styled("p")`
  margin: 4px 0 10px;
  letter-spacing: 5px;
  cursor: pointer;
`;

const NotesArea = Styled("textarea")`
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

function Notes() {
  const [notesOpen, setNotesOpen] = useState(false);
  const [threadsOpen, setThreadsOpen] = useState(false);
  const [npcsOpen, setNpcsOpen] = useState(false);

  const { npcs, threads, notes } = useSelector((s) => s);

  const dispatch = useDispatch();

  return (
    <>
      <Wrapper notesOpen={notesOpen} position="25px">
        <Title onClick={() => setNotesOpen(!notesOpen)}>
          {"notes".toUpperCase()}
        </Title>
        <NotesArea
          name="notes"
          id="notes"
          value={notes}
          onChange={(e) => dispatch(changeNotes(e.target.value))}
        />
      </Wrapper>
      <Wrapper notesOpen={threadsOpen} position="225px">
        <Title onClick={() => setThreadsOpen(!threadsOpen)}>
          {"threads".toUpperCase()}
        </Title>
        <NotesArea
          name="threads"
          id="threads"
          value={threads}
          onChange={(e) => dispatch(changeThreads(e.target.value))}
        />
      </Wrapper>
      <Wrapper notesOpen={npcsOpen} position="425px">
        <Title onClick={() => setNpcsOpen(!npcsOpen)}>
          {"npcs".toUpperCase()}
        </Title>
        <NotesArea
          name="npcs"
          id="npcs"
          value={npcs}
          onChange={(e) => dispatch(changeNPCs(e.target.value))}
        />
      </Wrapper>
    </>
  );
}

export default Notes;
