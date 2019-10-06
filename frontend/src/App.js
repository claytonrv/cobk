import React from 'react';
import './App.css';

import logo from "./assets/icon.png"

import Routes from './routes';

function App() {

  return (
    <div className="container">
      <img className="site_logo" src={logo} alt="Cobk" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
