import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';

import Fonts from 'ideaStudio/eloyt/fonts';

import logo from 'ideaStudio/assets/images/logo.png';

export default class Main extends Component {
  render() {
    const base = this;

    return (
      <View style={style.wrapperLogo}>
      <Image source={logo}/>
      <Text style={style.appName} >Idea Studio </Text>
      <View style={style.separator}/>
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
            // console.log("Logged in!");
            // console.log(data);
            base.setState({
                user: data.credentials
            });
          }
        }
        onLogout={
          () => {
            // console.log("Logged out.");
            base.setState({
                user: null
            });
          }
        }
        onLoginFound={
          (data) => {
            // console.log("Existing login found.");
            // console.log(data);
            base.setState({
                user: data.credentials
            });
          }
        }
        onLoginNotFound={
          () => {
            // console.log("No user logged in.");
            base.setState({
                user: null
            });
          }
        }
        onError={
          (data) => {
            // console.log("ERROR");
            // console.log(data);
          }
        }
        onCancel={
          () => {
            // console.log("User cancelled.");
          }
        }
        onPermissionsMissing={
          (data) => {
            // console.log("Check permissions!");
            // console.log(data);
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
  appName: {
    fontFamily: Fonts.openSans,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  separator: {
    marginTop: 70,
  },
  facebookLoginButton: {},
});
