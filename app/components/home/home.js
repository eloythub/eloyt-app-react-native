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

import { MenuContainer, MenuItems } from '../fixtures/footer-menu';
import { navigationView } from '../partials/drawer-view';

const menuItems = [];
menuItems.push(<MenuItems id={1} />);
menuItems.push(<MenuItems  id={2} />);
menuItems.push(<MenuItems  id={3}/>);

class HomeView extends Component {
  render() {
    return (
      <View style={style.wrapperLogo}>
        <ScrollView>
          <MenuItems />
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer items={menuItems} />
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
