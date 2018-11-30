import React, { Component } from 'react';
import './Menu.css';
import logo from '../../img/as-logo.svg';
//<img src={logo} />
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu-bgr">
        
        JU OŠ "AVDO SMAILOVIĆ" - Sarajevo
        <br/>
        <br/>
        <a href="/">Početna</a>
       </div>
    )
  }
}
