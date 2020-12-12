function AddToLog(newString = document.getElementById('input').value) {
  
  const log = document.getElementById('log')

  let lineBreak = ""

  if (log.value !== "" && newString !== "") {
    lineBreak = '\n'
  }

  document.getElementById('log').value = log.value + lineBreak + newString;

  document.getElementById('input').value = "";

  log.scrollTop = log.scrollHeight;
}


export default AddToLog;