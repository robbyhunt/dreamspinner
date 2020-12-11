import React from 'react';
import Header from './Components/Header'
import Styled from "@emotion/styled";
import Start from "./Components/Start"
import Play from "./Components/Play"
import DiceSound from "./util/DiceSound"

const Wrapper = Styled('div')`
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: #00467f;
  background-image: url(http://www.transparenttextures.com/patterns/light-paper-fibers.png);
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {startOpen: true};
  }

  render() {

    const handleStart = () => {
      DiceSound()
      this.setState({startOpen: false})
    }

    return (
      <Wrapper>
        <Header />
        {this.state.startOpen ? (
          <Start onClick={handleStart}/>
        ) : (
          <Play />
        )}
      </Wrapper>
    );
  }
}
export default App;
