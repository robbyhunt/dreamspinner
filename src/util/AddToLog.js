function AddToLog(newString) {
  
  const log = document.getElementById('log')

  let lineBreak = ""

  if (log.value !== "") {
    lineBreak = '\n'
  }

  document.getElementById('log').value = log.value + lineBreak + newString;

  log.scrollTop = log.scrollHeight;
}


export default AddToLog;