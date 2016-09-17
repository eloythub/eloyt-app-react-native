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
  footer: {
    height: 60,
    width: 300,
  },
  signOutWrapper: {
    width: 125,
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  signOut: {
    backgroundColor: '#333',
    height: 60,
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.openSans,
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

const doLogOut = () => {
  FBLoginManager.logout(() => {
    Actions.login();
  });
};

export class NavigationView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.wrapper}>
        <TouchableOpacity>
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
        <ScrollView></ScrollView>
        <View style={style.footer}>
          <View style={style.signOutWrapper}>
            <Icon.Button
              name="ios-exit-outline"
              style={style.signOut}
              onPress={doLogOut}
              >
              <Text style={style.signOutText}>Sign out</Text>
            </Icon.Button>
          </View>
        </View>
      </View>
    );
  }
}
