import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCharacters } from "../../actionCreators";

import Styled from "@emotion/styled";

import EditIcon from "../../img/icons/edit-white.svg";

const Wrapper = Styled("div")`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const TitleBar = Styled("div")`
  margin: 0;
  text-align: left;
  font-size: 20px;
  background-color: #000000;
  color: #ffffff;
  width: calc(100% - 20px);
  padding: 0 10px;
  max-width: 680px;
  position: relative
`;

const Edit = Styled("div")`
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 2px;
  opacity: 1;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: url(${EditIcon});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  transition: 200ms;
  
  :hover {
    opacity: 0.7;
  }
`;

const TextArea = Styled("textarea")`
  width: calc(100% - 20px);
  outline: none;
  border: none;
  font-size: 16px;
  resize: ${(props) => (props.readOnly ? "none" : "vertical")};
  height: 100px;
  padding: 10px;
  border: ${(props) => (props.readOnly ? "" : "2px solid #dddddd")};
  border-top: none;
  border-radius: 0 0 5px 5px;

  ::-webkit-scrollbar {
    width: 5px;
  }
 
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #376d99;
  }
  
  :focus {
    outline: none;
  }
`;

const Bio = ({ bio, sheetIndex }) => {
  const [isEditable, setIsEditable] = useState(true);

  const { characters } = useSelector((s) => s);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let tempData = [...characters];
    tempData[sheetIndex].bio = e.target.value;

    dispatch(changeCharacters(tempData));
  };

  return (
    <>
      <TitleBar>
        Bio:
        <Edit onClick={() => setIsEditable(!isEditable)} />
      </TitleBar>
      <Wrapper>
        <TextArea
          value={bio}
          placeholder="Enter a character bio here..."
          id="characterBio"
          onChange={handleChange}
          readOnly={!isEditable}
        />
      </Wrapper>
    </>
  );
};

export default Bio;
