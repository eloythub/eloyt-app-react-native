import React, { Component } from 'react';

import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Login from './authentication/login';
import Home from './home/home';
import Search from './home/search';
import Record from './home/record';
import RecordedPostShare from './home/recordedPostShare';
import MyVideos from './home/my-videos';
import Settings from './home/settings';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="login"
          component={Login}
          initial={true}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="home"
          component={Home}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="search"
          component={Search}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="record"
          component={Record}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="recordedPostShare"
          component={RecordedPostShare}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="myVideos"
          component={MyVideos}
          type={ActionConst.REPLACE}
          hideNavBar={true}
          panHandlers={null}
          />
        <Scene
          key="settings"
          component={Settings}
          type={ActionConst.push}
          hideNavBar={false}
          panHandlers={null}
          title="Settings"
          />
      </Router>
    );
  }
}
