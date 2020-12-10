import React from 'react';
import Styled from "@emotion/styled";

const Wrapper = Styled('div')`
  background-color: #eaeaea;
  height: calc(100vh - 270px);
  width: 100vw;
  padding: 90px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = Styled('div')`
  width: 80.5vw;
  display: flex;
  justify-content: flex-end;
`;

const Clear = Styled('button')`
  cursor: pointer;
  margin-left: 10px;
`;

const Log = Styled('textarea')`
  width: 80vw;
  height: 100%;
  resize: none;
  margin-bottom: 10px;
`;

const Input = Styled('textarea')`
  width: 80vw;
  height: 40px;
  resize: none;
  margin-top: 10px;
`;


class Play extends React.Component {

  submit(event) {
    if (event.key === "Enter" && event.shiftKey) {
      let lineBreak = ""
      const log = document.getElementById('log').value
      const newString = document.getElementById('input').value.replace(/\n.*$/, '')

      if (log !== "") {
        lineBreak = '\n'
      }

      document.getElementById('log').value = log + lineBreak + newString;

      document.getElementById('input').value = "";
    }
  }

  clear() {
    document.getElementById('log').value = ""
  }

  undo() {
    document.getElementById('log').value = document.getElementById('log').value.replace(/\n.*$/, '');
  }

  render() {
    return (
      <Wrapper>
        <Log name="log" id="log" readOnly/>

        <ButtonWrapper>
          <Clear id="undo" onClick={this.undo}>Undo</Clear>
          <Clear id="clear" onClick={this.clear}>Clear Log</Clear>
        </ButtonWrapper>

        <Input name="input" id="input" placeholder="Type something here and press Shift + Enter to add it to the log..." rows={1} onKeyUp={this.submit} onKeyUp={this.submit}/>
      </Wrapper>
    );
  }
}
export default Play;