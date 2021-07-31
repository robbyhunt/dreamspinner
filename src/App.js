/*global netlifyIdentity*/

import React from "react";
import Start from "./Components/Start";
import Play from "./Components/Play";
import DiceSound from "./util/DiceSound";
import WesternBG from "./img/westernbg.jpg";
import FantasyBG from "./img/fantasybg.jpg";
import ScifiBG from "./img/scifibg.jpg";
import NoirBG from "./img/noirbg.jpg";
import ApocalypticBG from "./img/apocalypticbg.jpg";
import SaveLoad from "./Components/SaveLoad";

import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOpen: true,
      isLoggedIn: false,
      activeBackground:
        "http://www.transparenttextures.com/patterns/light-paper-fibers.png",
      activeGenre: "generic",
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

    const handleGenre = (event) => {
      let newBg;
      if (event.target.id === "fantasy") {
        newBg = FantasyBG;
      } else if (event.target.id === "western") {
        newBg = WesternBG;
      } else if (event.target.id === "scifi") {
        newBg = ScifiBG;
      } else if (event.target.id === "noir") {
        newBg = NoirBG;
      } else if (event.target.id === "generic") {
      } else if (event.target.id === "apocalyptic") {
        newBg = ApocalypticBG;
      }

      this.setState({ activeGenre: event.target.id });
      this.setState({ activeBackground: newBg });
    };

    return (
      <Provider store={store}>
        {this.state.startOpen ? (
          <Start onClick={handleStart} isLoggedIn={this.state.isLoggedIn} />
        ) : (
          <>
            <SaveLoad />
            <Play
              activeGenre={this.state.activeGenre}
              activeBackground={this.state.activeBackground}
              handleGenre={handleGenre}
            />
          </>
        )}
      </Provider>
    );
  }
}
export default App;
