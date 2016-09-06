import React, { Component } from 'react';

import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Splash from './intro/splash';
import Login from './authentication/login';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Scene
          initial={true}
          unmountScenes
          key="splash"
          component={Splash}
          hideNavBar={true}
          />
        <Scene
          unmountScenes
          key="login"
          component={Login}
          title="Login"
          tab={true}
          type={ActionConst.REPLACE}
          />
      </Router>
    );
  }
}
