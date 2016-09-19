
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { NavigationView } from '../partials/drawer-view';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;
  }

  render() {
    let base = this;
    return (
      <View style={style.wrapperLogo}>
        <ScrollView>
          <Text>
            Search Page
          </Text>
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
                base.root.refs.drawerLayout.openDrawer();
              }} />
            <MenuItem name="record" icon="ios-camera"  onPress={() => {
                Actions.record(this);
              }} />
            <MenuItem name="Home" icon="md-home" onPress={() => {
                Actions.home(this);
              }} />
          </MenuContainer>
        </View>
      </View>
    );
  }
}

SearchView.propTypes = {
  root: PropTypes.any.isRequired
};

export default class Search extends Component {
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
        <SearchView root={this}/>
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
