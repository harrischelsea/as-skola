import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home';
import Article from '../pages/article/Article';
import Cms from '../pages/cms/Cms';

export default class Router extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article"component={Article} />
          <Route exact path="/cms"component={Cms} />
      </Switch>
    )
  }
}
