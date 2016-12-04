import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Fonts from 'eloyt/common/fonts';

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={style.wrapper}>
        <Text style={style.text}>
          Login
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3b5998',
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.openSans,
    textAlign: 'center',
    color: 'white',
  },
});
