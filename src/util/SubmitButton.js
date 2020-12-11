import AddToLog from "./AddToLog"

function SubmitButton() {  
  const newString = document.getElementById('input').value;
  AddToLog(newString);
  document.getElementById('input').value = "";
}

export default SubmitButton;