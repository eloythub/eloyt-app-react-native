import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';

export default class Login extends Component {
  constructor (props) {
    super(props);

    this.loginLoaded = true;
  }

  render() {
    const base = this;

    return (
      <View style={style.wrapperLogo}>
        <FBLogin style={style.facebookLoginButton}
          ref={
            (fbLogin) => {
              this.fbLogin = fbLogin
            }
          }
          permissions={["email", "user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={
            (data) => {
              base.setState({
                  user: data.credentials
              });
            }
          }
          onLogout={
            () => {
              base.setState({
                  user: null
              });
            }
          }
          onLoginFound={
            (data) => {
              base.setState({
                  user: data.credentials
              });
            }
          }
          onLoginNotFound={
            () => {
              base.setState({
                  user: null
              });
            }
          }
          onError={
            () => {
              ToastAndroid.showWithGravity(
                'Something went wrong, please try again',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
          }
          onCancel={
            () => {
              ToastAndroid.showWithGravity(
                'Request just canceled',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
          }
          onPermissionsMissing={
            () => {
              ToastAndroid.showWithGravity(
                'Permission failed!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
          }
        />
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
});
