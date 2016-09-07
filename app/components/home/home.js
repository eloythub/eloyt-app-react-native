import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';

import { navigationView } from '../partials/drawerView';

class HomeView extends Component {
  render() {
    return (
      <View style={style.wrapperLogo}>
      </View>
    );
  }
}

export default class Home extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <HomeView />
      </DrawerLayoutAndroid>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: -50,
  },
});
