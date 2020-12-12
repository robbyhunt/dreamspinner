import React from 'react';
import Styled from "@emotion/styled";
import Fate from '../Generators/Fate';
import ComplexQuestion from '../Generators/ComplexQuestion';
import Undo from '../util/Undo';
import ClearLog from '../util/ClearLog';
import SubmitButton from '../util/SubmitButton';
import Submit from '../util/Submit';
import Place from '../Generators/Place'

const Wrapper = Styled('div')`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = Styled('div')`
  width: 100%; 
  max-width: 1500px; 
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));
`;

const ButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 20px);
  flex-wrap: wrap;
  background-color: #00467f;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  padding: 10px;

  @media (min-width: 958px) {
    flex-direction: row;
  }
`;

const GeneratorWrapper = Styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  justify-content: space-around;

  @media (min-width: 958px) {
    margin-bottom: 0;
  }
`;

const FateButtonWrapper = Styled('div')`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;

  @media (min-width: 958px) {
    margin-bottom: 0;
  }
`;

const LogButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-around;

  @media (min-width: 958px) {
    justify-content: flex-end;
  }
`;

const Button = Styled('button')`
  cursor: pointer;
  margin-left: 0px;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: #efefefef;
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 958px) {
    margin-left: 10px;
  }
`;

const GenerateButton = Styled(Button)`
  margin-left: 0;

  @media (min-width: 958px) {
    margin-right: 10px;
    margin-left: 0;
  }
`;

const Log = Styled('textarea')`
  width: calc(100% - 20px);
  height: 50vh;
  resize: none;
  padding: 10px;
  font-size: 18px;
  line-height: 30px;

  &:focus {
    outline: none;
  }

  @media (min-width: 958px) {
    height: 70vh;
  }
`;

const Input = Styled('textarea')`
  width: calc(100% - 20px);
  padding: 10px;
  height: 40px;
  resize: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

class Play extends React.Component {
  render() {

    const {activeGenre} = this.props;

    return (
      <Wrapper>
          <Inner>
            <ButtonWrapper>
              <Button id={`${activeGenre}-place`} onClick={Place}>Place (Only works for fantasy atm)</Button>
            </ButtonWrapper>

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