import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  DrawerLayoutAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { NavigationView } from '../partials/drawer-view';
import UploadSection from '../partials/home/upload-section';

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;

    this.state = {
      uploadRequest: null,
    };
  }

  componentWillReceiveProps(res) {
    this.setState({
      uploadRequest: res.root.props.navigationState.uploadData,
    });
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false}
        />
        <ScrollView>
          <UploadSection queue={this.state.uploadRequest} />

          
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
                this.root.refs.drawerLayout.openDrawer();
              }} />
            <MenuItem name="record" icon="ios-videocam"  onPress={() => {
                Actions.record();
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
  Actions.search();
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
