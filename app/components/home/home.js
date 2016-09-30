import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { NavigationView } from '../partials/drawer-view';


class HomeView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;
  }

  render() {
    let base = this;

    return (
      <View style={style.wrapperLogo}>
        <ScrollView>
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
                base.root.refs.drawerLayout.openDrawer();
              }} />
            <MenuItem name="record" icon="ios-videocam"  onPress={() => {
                Actions.record(base);
              }} />
          </MenuContainer>
        </View>
      </View>
    );
  }
}

/*
inventory:

<MenuItem name="Search" icon="ios-search" onPress={() => {
  Actions.search(base);
}} />
*/

HomeView.propTypes = {
  root: PropTypes.any.isRequired
};

export default class Home extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={'drawerLayout'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavigationView root={this} /> }>
        <HomeView root={this}/>
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
});
