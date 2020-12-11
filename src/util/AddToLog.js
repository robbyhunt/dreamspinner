function AddToLog(newString) {  

  let lineBreak = ""

  if (document.getElementById('log').value !== "") {
    lineBreak = '\n'
  }

  document.getElementById('log').value = document.getElementById('log').value + lineBreak + newString;
}

export default AddToLog;