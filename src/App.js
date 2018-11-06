import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import 'semantic-ui-css/semantic.min.css';
import Router from './router/Router';
import { BrowserRouter, HashRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Router />
      </HashRouter>
      // <Home />
    );
  }
}

export default App;
