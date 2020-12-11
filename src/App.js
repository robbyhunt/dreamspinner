import React from 'react';
import Header from './Components/Header'
import Styled from "@emotion/styled";
import Start from "./Components/Start"
import Play from "./Components/Play"

const Wrapper = Styled('div')`
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  background-color: #00467f;
  background-image: url(http://www.transparenttextures.com/patterns/light-paper-fibers.png);
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {startOpen: false};
  }

  render() {

    const handleStart = () => {
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
