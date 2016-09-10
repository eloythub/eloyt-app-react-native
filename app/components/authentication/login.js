import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

import Fonts from 'ideaStudio/common/fonts';

import logo from 'ideaStudio/app/assets/images/logo.png';
import background from 'ideaStudio/app/assets/images/login-cover.jpg';

export default class Login extends Component {
  onLogin = data => {
    this.setState({
      user: data.credentials
    });

    Actions.home(this);
  }

  onLogout = () => {
    this.setState({
      user: null
    });
  }

  onLoginFound = data => {
    this.setState({
      user: data.credentials
    });

    Actions.home(this);
  }

  onLoginNotFound = () => {
    this.setState({
      user: null
    });
  }

  onError = () => {
    ToastAndroid.showWithGravity(
      'Something went wrong, please try again',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  onCancel = () => {
    ToastAndroid.showWithGravity(
      'Request just canceled',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  onPermissionsMissing = () => {
    ToastAndroid.showWithGravity(
      'Permission failed!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <View style={style.bgImageWrapper}>
          <Image source={background} style={style.bgImage} />
        </View>
        <ScrollView style={style.quoteContainer}>
          <View style={style.quoteView}>
            <Image source={logo}/>
            <Text style={style.quote}>
              IDEA STUDIO
              {'\n'}
              IS
              {'\n'}
              INSTANT SUCCESS
            </Text>
          </View>
        </ScrollView>
        <View>
          <Text style={style.desc}>
            Get Start and Explore ur Ideas and passions
          </Text>
          <FBLogin
            style={style.facebookLoginButton}
            ref={
              (fbLogin) => {
                this.fbLogin = fbLogin
              }
            }
            permissions={['email', 'user_friends', 'user_photos']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}

            onLogin={this.onLogin}
            onLogout={this.onLogout}
            onLoginFound={this.onLoginFound}
            onLoginNotFound={this.onLoginNotFound}
            onError={this.onError}
            onCancel={this.onCancel}
            onPermissionsMissing={this.onPermissionsMissing}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },
  facebookLoginButton: {
    height: 60,
    padding: 20,
  },
  quoteContainer: {
    flex: 1,
  },
  quoteView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 50,
  },
  quote: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    color: '#e1e1e1',
    fontFamily: Fonts.openSans,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.openSans,
    marginBottom: 10,
  },
});
