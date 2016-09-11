import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
} from 'react-native';

import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { navigationView } from '../partials/drawer-view';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <ScrollView>
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
                console.log('menu');
              }} />
            <MenuItem name="record" icon="ios-camera"  onPress={() => {
                console.log('record');
              }} />
            <MenuItem name="profile" icon="ios-people" onPress={() => {
                console.log('profile');
              }} />
          </MenuContainer>
        </View>
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
    flex: 1,
  },
  footerMenu: {
    backgroundColor: '#000',
  },
  footerText: {
    color: '#fff',
  },
});
