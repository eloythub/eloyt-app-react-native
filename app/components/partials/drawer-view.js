import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

import FBPhoto from '../partials/facebook/photo';
import FBInfo from '../partials/facebook/info';
import DrawerListItem from '../partials/drawer-list-item';

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#82848a',
  },
  header: {
    width: 300,
    backgroundColor: '#545454',
    borderBottomColor: '#707070',
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
    color: '#eee',
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

  render() {
    let base = this;

    return (
      <View style={style.wrapper}>
        <View style={style.header}>
          <View style={style.headerPictureContainer}>
            <FBPhoto width={80} />
          </View>
          <View style={style.headerInfoContainer}>
            <FBInfo data="name" viewStyle={style.headerInfoContainer} textStyle={style.fbInfoName}/>
            <FBInfo data="email" viewStyle={style.headerInfoContainer} textStyle={style.fbInfoEmail}/>
          </View>
        </View>
        <ScrollView>
          <DrawerListItem caption="News Feed" icon="logo-rss" onPress={() => {
            Actions.home(base);
          }} />
          <DrawerListItem caption="My Videos" icon="ios-videocam" onPress={() => {
              Actions.myVideos(base);
            }} />
          <DrawerListItem caption="Settings" icon="ios-settings" onPress={() => {
              Actions.settings(base);
            }} />
          <DrawerListItem caption="Sign Out" icon="ios-exit-outline" onPress={() => {
              FBLoginManager.logout(() => {
                Actions.login(base);
              });
            }} />
        </ScrollView>
      </View>
    );
  }
}

/*
inventory:

<DrawerListItem caption="News Feed" icon="logo-rss" onPress={() => {
    Actions.home(base);
  }} />

<DrawerListItem caption="Search" icon="ios-search" onPress={() => {
    Actions.search(base);
  }} />

*/
