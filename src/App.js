/*global netlifyIdentity*/

import React from 'react';
import Styled from "@emotion/styled";
import Start from "./Components/Start"
import Play from "./Components/Play"
import DiceSound from "./util/DiceSound"
import WesternBG from "./img/westernbg.jpg"
import FantasyBG from "./img/fantasybg.jpg"
import ScifiBG from "./img/scifibg.jpg"
import NoirBG from "./img/noirbg.jpg"
import ApocalypticBG from "./img/apocalypticbg.jpg"
import Settings from "./Components/Settings"
import Notes from "./Components/Notes"
import SaveLoad from "./Components/SaveLoad"
import axios from "axios"

const Wrapper = Styled('div')`
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: #00467f;
  background-image: ${props => `url(${props.activeBackground})`};
  background-size: ${props => props.activeBackground === "http://www.transparenttextures.com/patterns/light-paper-fibers.png" ? "initial" : "cover"};
  background-position: center;
  overflow: hidden;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOpen: true,
      isLoading: false,
      activeBackground: "http://www.transparenttextures.com/patterns/light-paper-fibers.png",
      activeGenre: "generic",
      settingsOpen: false,
      notesOpen: false,
      threadsOpen: false,
      npcsOpen: false,
      user: undefined,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    netlifyIdentity.on('init', user => {
      if (user) {
        user.jwt(true).then(this.setState({isLoggedIn: true}))
      }
    })
    netlifyIdentity.on('login', user => {
      user.jwt(true).then(() => {
        this.setState({isLoggedIn: true})
        netlifyIdentity.close()
      })
    })
    netlifyIdentity.on('logout', () => {
        this.setState({user: undefined})
        this.setState({isLoggedIn: false})
        netlifyIdentity.close();
      }
    )
  }

  render() {
    const handleStart = async () => {
      this.setState({isLoading: true})
      let accountInfo;
      if (this.state.isLoggedIn) {
        let token
        await netlifyIdentity.refresh(true).then(returnedToken => {
          token = returnedToken
        })

        accountInfo = await axios.post('/.netlify/functions/createUser', {}, {headers: {"Authorization": `Bearer ${token}`}})

        this.setState({user: accountInfo.data})
      }
      DiceSound()
      this.setState({startOpen: false})
      this.setState({isLoading: false})
    }

    const handleSetUser = (value) => {
      this.setState({user: value})
    }

    const handleOpenSettings = () => {
      closeAllPopups()
      this.setState({settingsOpen: !this.state.settingsOpen})
    }

    const handleOpenNotes = () => {
      closeAllPopups()
      this.setState({notesOpen: !this.state.notesOpen})
    }

    const handleOpenThreads = () => {
      closeAllPopups()
      this.setState({threadsOpen: !this.state.threadsOpen})
    }

    const handleOpenNPCs = () => {
      closeAllPopups()
      this.setState({npcsOpen: !this.state.npcsOpen})
    }
    
    const closeAllPopups = () => {
      this.setState({npcsOpen: false})
      this.setState({settingsOpen: false})
      this.setState({notesOpen: false})
      this.setState({threadsOpen: false})
    }

    const handleGenre = (event) => {
      let newBg
      if (event.target.id === "fantasy") {
        newBg = FantasyBG;
      } else if (event.target.id === "western") {
        newBg = WesternBG;
      } else if (event.target.id === "scifi") {
        newBg = ScifiBG;
      } else if (event.target.id === "noir") {
        newBg = NoirBG;
      } else if (event.target.id === "generic") {
        newBg = "http://www.transparenttextures.com/patterns/light-paper-fibers.png"
      } else if (event.target.id === "apocalyptic") {
        newBg = ApocalypticBG
      }

      this.setState({activeGenre: event.target.id})
      this.setState({activeBackground: newBg})
    }

    return (
      <Wrapper activeBackground={this.state.activeBackground}>
        {this.state.startOpen ? (
          <Start
            onClick={handleStart}
            isLoggedIn={this.state.isLoggedIn}
            isLoading={this.state.isLoading}
          />
        ) : (
          <>
            <SaveLoad
              user={this.state.user}
              handleSetUser={handleSetUser}
            />
            <Play activeGenre={this.state.activeGenre}/>
            <Settings
              settingsOpen={this.state.settingsOpen}
              openSettings={handleOpenSettings}
              handleGenre={handleGenre}
            />
            <Notes
              notesOpen={this.state.notesOpen}
              openNotes={handleOpenNotes}
              position="25px"
              title="notes"
            />
            <Notes
              notesOpen={this.state.threadsOpen}
              openNotes={handleOpenThreads}
              position="225px"
              title="threads"
            />
            <Notes
              notesOpen={this.state.npcsOpen}
              openNotes={handleOpenNPCs}
              position="425px"
              title="npcs"
            />
          </>
        )}
      </Wrapper>
    );
  }
}
export default App;
