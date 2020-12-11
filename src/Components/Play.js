import React from 'react';
import Styled from "@emotion/styled";
import Generator from '../Generators/Generator';

const Wrapper = Styled('div')`
  background-color: #00467f;
  background-image: url(http://www.transparenttextures.com/patterns/light-paper-fibers.png);
  height: calc(100vh - 130px);
  width: 100vw;
  padding: 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 820px) {
    padding: 90px 0;
    height: calc(100vh - 270px);
  }
`;
const ButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 435px) {
    flex-direction: row;
  }
`;

const GeneratorWrapper = Styled('div')`
  display: flex;
  width: 81vw;
  justify-content: center;
  margin-bottom: 10px;
  justify-content: space-around;

  @media (min-width: 435px) {
    width: 40.25vw;
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

const LogButtonWrapper = Styled('div')`
  display: flex;
  width: 81vw;
  justify-content: space-around;

  @media (min-width: 435px) {
    width: 40.25vw;
    justify-content: flex-end;
  }
`;

const Button = Styled('button')`
  cursor: pointer;
  margin-left: 0px;

  @media (min-width: 435px) {
    margin-left: 10px;
  }
`;

const GenerateButton = Styled(Button)`
  background-color: #000000;
  color: #ffffff;
  margin-right: 0px;
  margin-left: 0;

  @media (min-width: 435px) {
    margin-right: 10px;
    margin-left: 0;
  }
`;

const Log = Styled('textarea')`
  width: calc(80vw - 10px);
  height: 100%;
  resize: none;
  padding: 10px;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  line-height: 30px;

  &:focus {
    outline: none;
  }
`;

const Input = Styled('textarea')`
  width: 80vw;
  height: 40px;
  resize: none;
  margin-top: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;

  &:focus {
    outline: none;
  }
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

  submitButton() {
    let lineBreak = ""
    const log = document.getElementById('log').value
    const newString = document.getElementById('input').value

    if (log !== "") {
      lineBreak = '\n'
    }

    document.getElementById('log').value = log + lineBreak + newString;

    document.getElementById('input').value = "";
  }

  clear() {
    document.getElementById('log').value = ""
  }

  undo() {
    document.getElementById('log').value = document.getElementById('log').value.replace(/\n.*$/, '');
  }

  generateAction() {
    let lineBreak = ""
    if (document.getElementById('log').value !== "") {
      lineBreak = '\n'
    }

    document.getElementById('log').value = document.getElementById('log').value + lineBreak + Generator("action");
  }

  generateDescription() {
    let lineBreak = ""
    if (document.getElementById('log').value !== "") {
      lineBreak = '\n'
    }

    document.getElementById('log').value = document.getElementById('log').value + lineBreak + Generator("description");
  }

  render() {
    return (
      <Wrapper>
        <Log name="log" id="log" readOnly/>

        <ButtonWrapper>
          <GeneratorWrapper>
            <GenerateButton id="cqa" onClick={this.generateAction}>CQ: Action</GenerateButton>
            <GenerateButton id="cqd" onClick={this.generateDescription}>CQ: Description</GenerateButton>
          </GeneratorWrapper>

          <LogButtonWrapper>
            <Button id="submit" onClick={this.submitButton}>Submit</Button>
            <Button id="undo" onClick={this.undo}>Undo</Button>
            <Button id="clear" onClick={this.clear}>Clear Log</Button>
          </LogButtonWrapper>
        </ButtonWrapper>

        <Input name="input" id="input" placeholder="Type something here and press Shift + Enter or click Submit..." rows={1} onKeyUp={this.submit} onKeyUp={this.submit}/>
      </Wrapper>
    );
  }
}
export default Play;