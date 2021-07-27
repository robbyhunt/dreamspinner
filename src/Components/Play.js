import React from 'react';
import Styled from "@emotion/styled";
import Fate from '../Generators/Fate';
import ComplexQuestion from '../Generators/ComplexQuestion';
import Undo from '../util/Undo';
import ClearLog from '../util/ClearLog';
import SubmitButton from '../util/SubmitButton';
import Submit from '../util/Submit';
import Place from '../Generators/Place'
import Npc from '../Generators/Npc'
import Item from '../Generators/Item'
import RollDice from '../util/DiceRoll';

const Wrapper = Styled('div')`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
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
  margin-top: 40px;

  @media (min-width: 457px) {
    margin-top: 0px;
  }
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
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;


  @media (min-width: 958px) {
    flex-direction: row;
  }
`;

const GeneratorWrapper = Styled('div')`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  color: white;
  align-items: center;

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

const DiceButtonWrapper = Styled('div')`
  display: flex;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;
  margin-top: 0;

  @media (min-width: 958px) {
    margin-bottom: 0;
    margin-top: 15px;
  }

  @media (min-width: 1110px) {
    margin-top: 0;
  }
`;

const LogButtonWrapper = Styled('div')`
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  margin-left: 0;

  @media (min-width: 958px) {
    justify-content: flex-end;
    margin-top: 15px;
  }

  @media (min-width: 1110px) {
    margin-left: calc(100% - 226px);
  }

  @media (min-width: 1531px) {
    margin-top: 0;
    margin-left: 0;
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
`;

const Log = Styled('textarea')`
  width: calc(100% - 20px);
  height: 40vh;
  resize: none;
  padding: 10px;
  font-size: 24px;
  line-height: 30px;

  &:focus {
    outline: none;
  }

  @media (min-width: 958px) {
    height: 50vh;
  }

  @media (min-width: 1249px) {
    height: 55vh;
  }

  @media (min-width: 1531px) {
    height: 60vh;
  }
`;

const Input = Styled('textarea')`
  width: calc(100% - 20px);
  padding: 10px;
  height: 60px;
  resize: none;
  font-size: 20px;

  @media (min-width: 1531px) {
    height: 100px;
  }

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
              <Button id={`${activeGenre}`} onClick={Place} style={{marginLeft: "0"}}>Place (Only works for fantasy atm)</Button>
              <Button id={`${activeGenre}`} onClick={Item}>Item (Only works for apocalyptic atm)</Button>
              <Button id={`${activeGenre}`} onClick={Npc}>Character (Only works for fantasy atm)</Button>
            </ButtonWrapper>

            <Log name="log" id="log" readOnly/>

            <ButtonWrapper>
              <GeneratorWrapper>
                Complex Question:
                <GenerateButton id="cqa" onClick={ComplexQuestion}>Action</GenerateButton>
                <GenerateButton id="cqd" onClick={ComplexQuestion}>Description</GenerateButton>
              </GeneratorWrapper>

              <FateButtonWrapper>
                Yes / No: 
                <Button id="fateunlikely" onClick={Fate}>Unlikely</Button>
                <Button id="fate5050" onClick={Fate}>50/50</Button>
                <Button id="fatelikely" onClick={Fate}>Likely</Button>
              </FateButtonWrapper>

              <DiceButtonWrapper>
                Dice:
                <Button id="d4" onClick={RollDice}>d4</Button>
                <Button id="d6" onClick={RollDice}>d6</Button>
                <Button id="d8" onClick={RollDice}>d8</Button>
                <Button id="d10" onClick={RollDice}>d10</Button>
                <Button id="d12" onClick={RollDice}>d12</Button>
                <Button id="d20" onClick={RollDice}>d20</Button>
                <Button id="d100" onClick={RollDice}>d100</Button>
              </DiceButtonWrapper>

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