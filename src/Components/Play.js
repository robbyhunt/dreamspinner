import React, { useState } from "react";
import Styled from "@emotion/styled";
import Log from "./GameLog/Log";
import Notebook from "./Notebook/Notebook";
import Settings from "./Settings";
import DialogShortcut from "./common/DialogShortcut";

const Wrapper = Styled("div")`
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: #00467f;
  background-image: ${(props) => `url(${props.activeBackground})`};
  background-size: ${(props) =>
    props.activeBackground ===
    "http://www.transparenttextures.com/patterns/light-paper-fibers.png"
      ? "initial"
      : "cover"};
  background-position: center;
  overflow: hidden;
  position: relative;
`;

const Play = ({ activeGenre, activeBackground, handleGenre }) => {
  const settingsHook = useState(false);
  const notebookHook = useState(true);

  return (
    <Wrapper activeBackground={activeBackground}>
      <Log activeGenre={activeGenre} />
      {notebookHook[0] && <Notebook hook={notebookHook} />}
      <Settings
        settingsOpen={settingsHook[0]}
        openSettings={settingsHook[1]}
        handleGenre={handleGenre}
      />
      <DialogShortcut
        title="NOTEBOOK"
        isOpen={notebookHook[0]}
        handleToggle={notebookHook[1]}
      />
    </Wrapper>
  );
};

export default Play;
