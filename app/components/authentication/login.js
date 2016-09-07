import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const base = this;

    return (
      <View style={style.wrapperLogo}>
        <ScrollView></ScrollView>
        <View>
          <FBLogin
            style={style.facebookLoginButton}
            ref={
              (fbLogin) => {
                this.fbLogin = fbLogin
              }
            }
            permissions={['email', 'user_friends', 'user_photos']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={
              (data) => {
                base.setState({
                    user: data.credentials
                });

                Actions.home(base);
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

                Actions.home(base);
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
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  facebookLoginButton: {
    height: 60,
    padding: 20,
  },
});
