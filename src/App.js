import React from 'react';
import logo from './img/mandala.png';
import './App.css';
import Header from './Components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-landing">
        <p className="Title">
          Dreamspinner
        </p>
        <p className="Title" id="Tagline">
          A Modern solo RPG and creative writing tool
        </p>
        <img src={logo} className="App-logo" alt="logo" />

        <p className="Title" id="Subtitle">
          Coming Soon
        </p>
      </div>
    </div>
  );
}

export default App;
