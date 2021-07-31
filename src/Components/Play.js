import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector } from "react-redux";

import Log from "./GameLog/Log";
import Notebook from "./Notebook/Notebook";
import Generators from "./Generators";
import Settings from "./Settings";
import DialogShortcut from "./common/DialogShortcut";

import WesternBG from "../img/westernbg.jpg";
import FantasyBG from "../img/fantasybg.jpg";
import ScifiBG from "../img/scifibg.jpg";
import NoirBG from "../img/noirbg.jpg";
import ApocalypticBG from "../img/apocalypticbg.jpg";

const Wrapper = Styled("div")`
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: #00467f;
  background-image: ${(props) =>
    props.genre === "fantasy"
      ? `url(${FantasyBG})`
      : props.genre === "western"
      ? `url(${WesternBG})`
      : props.genre === "scifi"
      ? `url(${ScifiBG})`
      : props.genre === "noir"
      ? `url(${NoirBG})`
      : props.genre === "apocalyptic"
      ? `url(${ApocalypticBG})`
      : `url(http://www.transparenttextures.com/patterns/light-paper-fibers.png)`};
  background-size: ${(props) =>
    props.genre === "generic" ? "initial" : "cover"};
  background-position: center;
  overflow: hidden;
  position: relative;
`;

const Play = () => {
  const settingsHook = useState(false);
  const notebookHook = useState(true);
  const generatorsHook = useState(true);

  const { genre } = useSelector((s) => s);

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
