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
import UsersRepo from 'ideaStudio/common/repositories/users';
const userRepo = new UsersRepo();

import logo from 'ideaStudio/app/assets/images/logo.png';

export default class Main extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    let base = this;

    return (
      <View style={style.wrapperLogo}>
        <FBLogin
          style={style.facebookLoginButton}
          ref={
            (fbLogin) => {
              this.fbLogin = fbLogin
            }
          }
          onLoginFound={(user) => {
            userRepo.doLogin('facebook', user)
              .then((data) => {
                console.log(data);
                Actions.home(base);
              }, (error) => {
                Actions.login(base);
              });
          }}
          onLoginNotFound={() => {
            userRepo.doLogOut();

            TimerMixin.setTimeout(() => {
              Actions.login(base); // change scene to login page where user can authenticate into the app
            }, 3000);
          }}
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
