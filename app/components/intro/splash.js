import React, {
  Component,
} from 'react';

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { Actions } from 'react-native-router-flux';
import {
  FBLogin,
} from 'react-native-facebook-login';

import logo from 'ideaStudio/app/assets/images/logo.png';

export default class Main extends Component {
  constructor (props) {
    super(props);
  }

  onLoginFound = data => {
    this.setState({
      user: data.credentials
    });

    Actions.home(this);
  }

  onLoginNotFound = data => {
    this.setState({
        user: null
    });

    TimerMixin.setTimeout(() => {
      Actions.login(); // change scene to login page where user can authenticate into the app
    }, 3000);
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <FBLogin
          style={style.facebookLoginButton}
          ref={
            (fbLogin) => {
              this.fbLogin = fbLogin
            }
          }
          onLoginFound={this.onLoginFound}
          onLoginNotFound={this.onLoginNotFound}
        />
        <Image source={logo}/>
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
    backgroundColor: '#fafafa',
  },
  facebookLoginButton: {
    opacity: 0,
  },
});
