import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'ideaStudio/common/fonts';

import FBPhoto from '../partials/facebook/photo';
import FBInfo from '../partials/facebook/info';
import DrawerListItem from '../partials/drawer-list-item';

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    width: 300,
    backgroundColor: '#555555',
    borderBottomColor: '#454545',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
  },
  fbInfoName: {
    color: '#eee',
    fontSize: 16,
    fontFamily: Fonts.openSans,
  },
  fbInfoEmail: {
    color: '#aaa',
    fontSize: 12,
    fontFamily: Fonts.openSans,
  },
  headerPictureContainer: {
    width: 80,
  },
  headerInfoContainer: {
    width: 205,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class NavigationView extends Component {
  constructor(props) {
    super(props);
  }

  // <DrawerListItem caption="My Followers" icon="ios-people" onPress={() => {
  //     Actions.followers(this);
  //   }} />
  render() {
    let base = this;

    return (
      <View style={style.wrapper}>
        <TouchableOpacity onPress={() => {
            console.log('profile');
          }}>
          <View style={style.header}>
            <View style={style.headerPictureContainer}>
              <FBPhoto width={80} />
            </View>
            <View style={style.headerInfoContainer}>
              <FBInfo data="name" viewStyle={style.headerInfoContainer} textStyle={style.fbInfoName}/>
              <FBInfo data="email" viewStyle={style.headerInfoContainer} textStyle={style.fbInfoEmail}/>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <DrawerListItem caption="Search" icon="ios-search" onPress={() => {
              Actions.search(base);
            }} />
          <DrawerListItem caption="My Videos" icon="ios-videocam" onPress={() => {
              Actions.myVideos(base);
            }} />
          <DrawerListItem caption="Settings" icon="ios-settings" onPress={() => {
              Actions.settings(base);
            }} />
          <DrawerListItem caption="Sign Out" icon="ios-exit-outline" onPress={() => {
              FBLoginManager.logout(() => {
                Actions.login();
              });
            }} />
        </ScrollView>
      </View>
    );
  }
}
