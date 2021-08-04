import React, { useState, useEffect } from "react";
import Styled from "@emotion/styled";

import { useSelector } from "react-redux";

import Log from "./GameLog/Log";
import Notebook from "./Notebook/Notebook";
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
  const settingsHook = useState(false);
  const notebookHook = useState(true);
  const generatorsHook = useState(false);

  const { genre } = useSelector((s) => s);

  useEffect(() => {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = document.documentElement.clientHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <Wrapper genre={genre}>
      <Log />

      {notebookHook[0] && <Notebook hook={notebookHook} />}

      {generatorsHook[0] && <Generators hook={generatorsHook} />}

      <Settings settingsOpen={settingsHook[0]} openSettings={settingsHook[1]} />

      <DialogShortcut
        title="NOTEBOOK"
        isOpen={notebookHook[0]}
        handleToggle={notebookHook[1]}
        position="225px"
      />
      <DialogShortcut
        title="GENERATORS"
        isOpen={generatorsHook[0]}
        handleToggle={generatorsHook[1]}
        position="425px"
      />
    </Wrapper>
  );
};

export default Play;
