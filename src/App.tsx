import React from 'react';
import logo from './logo.svg';
import './index.css';
import './App.css';

function App () {
  return (
    <div className="App">
      <header className="bg-black min-h-screen flex flex-col items-center justify-items-center text-white">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
