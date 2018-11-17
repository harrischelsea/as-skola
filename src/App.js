import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import './pages/home/Home.css';
import Menu from './components/menu/Menu';
import Router from './router/Router';
import { BrowserRouter, HashRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="bgr">
        <Menu />

        <HashRouter>
          <Router />
        </HashRouter>
      </div>
    );
  }
}

export default App;
