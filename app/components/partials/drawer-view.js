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
import Fonts from 'ideaStudio/common/fonts';

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#333',
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
