export function addToLog(newString) {
  return { type: "ADD_TO_LOG", payload: newString };
}

export function changeLog(newLog) {
  return { type: "CHANGE_LOG", payload: newLog };
}

export function undoLog(payload) {
  return { type: "UNDO_LOG", payload };
}

export function changeInput(payload) {
  return { type: "CHANGE_INPUT", payload };
}

export function changeUser(payload) {
  return { type: "CHANGE_USER", payload };
}

export function changeNotes(payload) {
  return { type: "CHANGE_NOTES", payload };
}

export function changeThreads(payload) {
  return { type: "CHANGE_THREADS", payload };
}

export function changeNPCs(payload) {
  return { type: "CHANGE_NPCS", payload };
}

export function changeGenre(payload) {
  return { type: "CHANGE_GENRE", payload };
}

export function changeTitle(payload) {
  return { type: "CHANGE_TITLE", payload };
}
