import { isMobile } from "react-device-detect";

function ScrollLogToBottom(diceType, isExplosive, statName = null) {
  document.getElementById("log").scrollTop =
    document.getElementById("log").scrollHeight;

  // AUTO FOCUS INPUT TEXT BOX AFTER ANY SUBMISSION TAKES PLACE IF NOT ON MOBILE DEVICE
  if (!isMobile) {
    document.getElementById("input").focus();
  }
}

export default ScrollLogToBottom;
