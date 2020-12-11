function Undo() {  
  document.getElementById('log').value = document.getElementById('log').value.replace(/\n.*$/, '');
}

export default Undo;