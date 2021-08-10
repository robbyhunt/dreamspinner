import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";

import { useSelector } from "react-redux";

import { isMobile } from "react-device-detect";

import Log from "./GameLog/Log";
import Notebook from "./Notebook/Notebook";
import CharacterSheet from "./CharacterSheet/CharacterSheet";
import Inspiration from "./Inspiration/Inspiration";
import Generators from "./Generators";
import Settings from "./Settings";
import DialogShortcut from "./common/DialogShortcut";

import GenericBG from "../img/wallpapers/generic.png";
import WesternBG from "../img/wallpapers/western.jpeg";
import FantasyBG from "../img/wallpapers/fantasy.jpeg";
import ScifiBG from "../img/wallpapers/scifi.jpeg";
import NoirBG from "../img/wallpapers/noir.jpeg";
import ApocalypticBG from "../img/wallpapers/apocalyptic.jpeg";

const Wrapper = Styled("div")`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: ${(props) =>
    props.genre === "generic"
      ? `url(${GenericBG})`
      : props.genre === "western"
      ? `url(${WesternBG})`
      : props.genre === "scifi"
      ? `url(${ScifiBG})`
      : props.genre === "noir"
      ? `url(${NoirBG})`
      : props.genre === "apocalyptic"
      ? `url(${ApocalypticBG})`
      : props.genre === "fantasy"
      ? `url(${FantasyBG})`
      : null};
  background-size: ${(props) =>
    props.genre === "generic" ? "initial" : "cover"};
  background-position: center;
  overflow: hidden;
  position: relative;
  touch-action: none;
`;

const Play = () => {
  const notebookInitial =
    document.documentElement.clientWidth <= 800 ? false : true;

  const notebookHook = useState(notebookInitial);
  const characterHook = useState(false);
  const inspirationHook = useState(true);
  const generatorsHook = useState(false);
  const settingsHook = useState(false);

  const { genre } = useSelector((s) => s);

  const handleMobileWindowSize = () => {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    if (isMobile) {
      let vh = document.documentElement.clientHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      window.addEventListener("resize", handleMobileWindowSize);
      return () => {
        window.removeEventListener("resize", handleMobileWindowSize);
      };
    }
  }, []);

  return (
    <Wrapper genre={genre}>
      <Log />

      {notebookHook[0] && <Notebook hook={notebookHook} />}

      {characterHook[0] && <CharacterSheet hook={characterHook} />}

      {inspirationHook[0] && <Inspiration hook={inspirationHook} />}

      {generatorsHook[0] && <Generators hook={generatorsHook} />}

      <Settings settingsOpen={settingsHook[0]} openSettings={settingsHook[1]} />

      <DialogShortcut
        title="NOTEBOOK"
        isOpen={notebookHook[0]}
        handleToggle={notebookHook[1]}
        position="225px"
      />
      <DialogShortcut
        title="CHARACTERS"
        isOpen={characterHook[0]}
        handleToggle={characterHook[1]}
        position="425px"
      />
      <DialogShortcut
        title="INSPIRATION"
        isOpen={inspirationHook[0]}
        handleToggle={inspirationHook[1]}
        position="625px"
      />
      <DialogShortcut
        title="GENERATORS"
        isOpen={generatorsHook[0]}
        handleToggle={generatorsHook[1]}
        position="825px"
      />
    </Wrapper>
  );
};

export default Play;
