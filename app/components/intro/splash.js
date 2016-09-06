import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { Actions } from 'react-native-router-flux';

import Fonts from 'ideaStudio/common/fonts';
import logo from 'ideaStudio/app/assets/images/logo.png';

export default class Main extends Component {
  constructor (props) {
    super(props);

    TimerMixin.setTimeout(() => {
      Actions.login(); // change scene to login page where user can authenticate into the app
    }, 2000);
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
      <Image source={logo}/>
      <View style={style.separator}/>
      <Text style={style.appName}>Idea Studio</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: -50,
  },
  appName: {
    fontFamily: Fonts.openSans,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  separator: {
    marginTop: 50,
  },
});
