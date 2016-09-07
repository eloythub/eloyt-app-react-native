import React, { Component } from 'react';

import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Splash from './intro/splash';
import Login from './authentication/login';
import Home from './home/home';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Scene
          initial={true}
          key="splash"
          component={Splash}
          hideNavBar={true}
          />
        <Scene
          unmountScenes
          key="login"
          component={Login}
          hideNavBar={true}
          type={ActionConst.REPLACE}
          />
        <Scene
          unmountScenes
          key="home"
          component={Home}
          title="Home"
          hideNavBar={true}
          type={ActionConst.REPLACE}
          />
      </Router>
    );
  }
}
