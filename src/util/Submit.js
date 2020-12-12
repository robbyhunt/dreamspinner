import AddToLog from "./AddToLog"

function Submit(event) {  
  if (event.key === "Enter" && event.shiftKey) {
    const newString = document.getElementById('input').value.replace(/\n.*$/, '');
    AddToLog(newString);
  }
}

export default Submit;