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
import SaveButtons from "./Components/SaveButtons"
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
      activeBackground: "http://www.transparenttextures.com/patterns/light-paper-fibers.png",
      activeGenre: "generic",
      settingsOpen: false,
      notesOpen: false,
      threadsOpen: false,
      npcsOpen: false,
      user: undefined,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    netlifyIdentity.on('login', user => {
      if (user) {
        this.setState({isLoggedIn: true})
        this.setState({user: user})
      }
    })
    // eslint-disable-next-line no-undef
    netlifyIdentity.on('logout', () => {
        this.setState({isLoggedIn: false})
        this.setState({user: undefined})
      }
    )
  }

  render() {
    const handleStart = async () => {
      let accountInfo;
      if (this.state.isLoggedIn) {
        accountInfo = await axios.post('/.netlify/functions/createUser', {username: this.state.user.email})
        this.setState({user: accountInfo.data})
      }
      DiceSound()
      this.setState({startOpen: false})
    }

    const handleSetUser = (value) => {
      this.setState({user: value})
    }

    const handleOpenSettings = () => {
      this.setState({settingsOpen: !this.state.settingsOpen})
      this.setState({notesOpen: false})
      this.setState({threadsOpen: false})
      this.setState({npcsOpen: false})
    }

    const handleOpenNotes = () => {
      this.setState({notesOpen: !this.state.notesOpen})
      this.setState({settingsOpen: false})
      this.setState({threadsOpen: false})
      this.setState({npcsOpen: false})
    }

    const handleOpenThreads = () => {
      this.setState({threadsOpen: !this.state.threadsOpen})
      this.setState({settingsOpen: false})
      this.setState({notesOpen: false})
      this.setState({npcsOpen: false})
    }

    const handleOpenNPCs = () => {
      this.setState({npcsOpen: !this.state.npcsOpen})
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
          />
        ) : (
          <>
            <SaveButtons user={this.state.user} handleSetUser={handleSetUser}/>
            <Play activeGenre={this.state.activeGenre}/>
            <Settings settingsOpen={this.state.settingsOpen} openSettings={handleOpenSettings} handleGenre={handleGenre}/>
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
