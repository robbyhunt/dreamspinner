import React from 'react';
import Header from './Components/Header'
import Styled from "@emotion/styled";
import Start from "./Components/Start"
import Play from "./Components/Play"

const Wrapper = Styled('div')`
  text-align: center;
  background-color: #ffffff;
  font-family: 'Lato', sans-serif;
  position: relative;
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {startOpen: true};
  }

  render() {

    const handleStart = () => {
      this.setState(this.state = {startOpen: false})
      console.log("test")
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
