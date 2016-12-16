import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Fonts from 'eloyt/common/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return this.state.show
      ? (
        <View style={style.wrapper}>
          <Text style={style.text}>
            <Icon name="logo-facebook" style={style.logo} /> Login with Facebook
          </Text>
        </View>
      )
      : null
  }
}

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3b5998',
    paddingTop: 18,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.openSans,
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  logo: {
    fontSize: 15,
    color: 'white',
  },
});

FBLoginButton.propTypes = {
  show: PropTypes.bool,
};
