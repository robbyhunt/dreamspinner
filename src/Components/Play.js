import React from 'react';
import Styled from "@emotion/styled";
import Fate from '../Generators/Fate';
import ComplexQuestion from '../Generators/ComplexQuestion';
import Undo from '../util/Undo';
import ClearLog from '../util/ClearLog';
import SubmitButton from '../util/SubmitButton';
import Submit from '../util/Submit';

const Wrapper = Styled('div')`
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;
  display: flex;
  justify-content: center;
`;

const Inner = Styled('div')`
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;

  @media (min-width: 435px) {
    flex-direction: row;
  }
`;

const GeneratorWrapper = Styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  justify-content: space-around;

  @media (min-width: 435px) {
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

const FateButtonWrapper = Styled('div')`
  display: flex;
  color: white;
`;

const LogButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-around;

  @media (min-width: 435px) {
    justify-content: flex-end;
  }
`;

const Button = Styled('button')`
  cursor: pointer;
  margin-left: 0px;
  background-color: #ffffff;
  border: none;
  border-radius: 2px;
  padding: 5px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 435px) {
    margin-left: 10px;
  }
`;

const GenerateButton = Styled(Button)`
  background-color: #000000;
  color: #ffffff;
  margin-right: 0px;
  margin-left: 0;

  &:hover {
    background-color: #272727;
  }

  @media (min-width: 435px) {
    margin-right: 10px;
    margin-left: 0;
  }
`;

const Log = Styled('textarea')`
  width: calc(100% - 20px);
  height: 50vh;
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

  @media (min-width: 435px) {
    height: 70vh;
  }
`;

const Input = Styled('textarea')`
  width: calc(100% - 20px);
  padding: 10px;
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
  render() {
    return (
      <Wrapper>
        <Inner>
          <Log name="log" id="log" readOnly/>

          <ButtonWrapper>
            <GeneratorWrapper>
              <GenerateButton id="cqa" onClick={ComplexQuestion}>CQ: Action</GenerateButton>
              <GenerateButton id="cqd" onClick={ComplexQuestion}>CQ: Description</GenerateButton>
            </GeneratorWrapper>

            <FateButtonWrapper>
              Yes / No: 
              <Button id="fateunlikely" onClick={Fate}>Unlikely</Button>
              <Button id="fate5050" onClick={Fate}>50/50</Button>
              <Button id="fatelikely" onClick={Fate}>Likely</Button>
            </FateButtonWrapper>

            <LogButtonWrapper>
              <Button id="submit" onClick={SubmitButton}>Submit</Button>
              <Button id="undo" onClick={Undo}>Undo</Button>
              <Button id="clear" onClick={ClearLog}>Clear Log</Button>
            </LogButtonWrapper>
          </ButtonWrapper>

          <Input name="input" id="input" placeholder="Type something here and press Shift + Enter or click Submit..." rows={1} onKeyUp={Submit}/>
        </Inner>
      </Wrapper>
    );
  }
}
export default Play;