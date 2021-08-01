/*global netlifyIdentity*/

import React from "react";
import Start from "./Components/Start";
import Play from "./Components/Play";
import DiceSound from "./util/DiceSound";
import SaveLoad from "./Components/SaveLoad/SaveLoad";

import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOpen: true,
      isLoggedIn: false,
      settingsOpen: false,
    };
  }

  componentDidMount() {
    netlifyIdentity.on("init", (user) => {
      if (user) {
        user.jwt().then(this.setState({ isLoggedIn: true }));
      }
    });
    netlifyIdentity.on("login", (user) => {
      user.jwt().then(() => {
        this.setState({ isLoggedIn: true });
        netlifyIdentity.close();
      });
    });
    netlifyIdentity.on("logout", () => {
      this.setState({ user: undefined });
      this.setState({ isLoggedIn: false });
      netlifyIdentity.close();
    });
  }

  render() {
    const handleStart = () => {
      DiceSound();
      this.setState({ startOpen: false });
    };

    return (
      <Provider store={store}>
        {this.state.startOpen ? (
          <Start onClick={handleStart} isLoggedIn={this.state.isLoggedIn} />
        ) : (
          <>
            <SaveLoad />
            <Play />
          </>
        )}
      </Provider>
    );
  }
}
export default App;
