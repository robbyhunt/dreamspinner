import React from "react";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  margin-right: 5px;
`;

const TextArea = Styled("textarea")`
  width: calc(100% - 35px);
  height: calc(100% - 18px);
  border: none;
  outline: none;
  font-size: 18px;
  resize: none;
  padding: 10px 20px 10px 10px;

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

const Notes = ({ data, onChange }) => {
  return (
    <Wrapper>
      <TextArea
        name="notes"
        id="notes"
        value={data}
        onChange={onChange}
        placeholder="Take miscellaneous notes here..."
      />
    </Wrapper>
  );
};

export default Notes;
