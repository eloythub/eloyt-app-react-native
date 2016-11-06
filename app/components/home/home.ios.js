import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import Drawer from 'react-native-drawer'
import { NavigationView } from '../partials/drawer-view';

let backButtonPressedOnceToExit = 0;

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    if (backButtonPressedOnceToExit > 2) {
      BackAndroid.exitApp();
    } else {
      backButtonPressedOnceToExit++;

      setTimeout(() => {
        backButtonPressedOnceToExit = 0;
      }, 2000);

      return true;
    }
  }

  render() {
    let base = this;

    return (
      <View style={style.wrapperLogo}>
        <StatusBar hidden={false} />
        <ScrollView>
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
                base.root.refs.drawerLayout.open();
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
      <Drawer
        type="overlay"
        ref={'drawerLayout'}
        captureGestures={'open'}
        negotiatePan={true}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        style={drawerStyles}
        content={<NavigationView root={this} />}>
        <HomeView root={this}/>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
  },
  footerMenu: {
    backgroundColor: '#000',
  },
});