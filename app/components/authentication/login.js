import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Toast from 'react-native-simple-toast';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';
import FBLoginButton from 'eloyt/app/components/partials/facebook/button';
import { Actions } from 'react-native-router-flux';

import Fonts from 'eloyt/common/fonts';
import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

import SettingsRepo from 'eloyt/common/repositories/settings';
const settingsRepo = new SettingsRepo();

import logo from 'eloyt/app/assets/images/logo.png';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: false,
      loginButtonShow: false,
    };

    settingsRepo.cleanUp();
  }

  rejectLogin() {
    Toast.show('Something went wrong, please try again later.', Toast.SHORT);

    FBLoginManager.logout(() => {
      userRepo.doLogOut();

      settingsRepo.cleanUp();

      Actions.refresh();
    });

    this.setState({
      waiting: false,
    });
  }

  doLogin(res) {
    if (res.statusCode !== 200) {
      this.rejectLogin();

      return;
    }

    settingsRepo.loadFromServer().then(() => {
      this.setState({
        waiting: false,
      });

      Actions.home();
    }, (error) => {
      this.rejectLogin();
    });
  }

  doLoginRevert(error) {
    Toast.show(error, Toast.SHORT);

    FBLoginManager.logout(() => {
      userRepo.doLogOut();

      settingsRepo.cleanUp();

      Actions.refresh();
    });

    this.setState({
      waiting: false,
    });
  }
  
  render() {
    return (
      <View style={style.wrapperLogo}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false}
        />
        <Spinner visible={this.state.waiting} />
        <View style={style.quoteContainer}>
          <View style={style.quoteView}>
            <Image style={style.logo} source={logo}/>
          </View>
        </View>
        <View>
          <FBLogin
            buttonView={ <FBLoginButton show={this.state.loginButtonShow} /> }
            ref="fbLogin"
            permissions={['email', 'user_friends', 'user_photos']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}

            onLogin={(user) => {
              this.setState({
                waiting: true,
              });

              userRepo.doLogin('facebook', user).then((res) => {
                this.doLogin(res);
              }, (error) => {
                this.doLoginRevert(error);
              });
            }}
            onLogout={() => {
              userRepo.doLogOut();

              settingsRepo.cleanUp();
            }}
            onLoginFound={(user) => {
              this.setState({
                waiting: true,
              });

              userRepo.doLogin('facebook', user)
                .then((data) => {
                  settingsRepo.loadFromServer().then(() => {
                    this.setState({
                      waiting: false,
                      loginButtonShow: false,
                    });

                    Actions.home();
                  }, (error) => {
                    Actions.login();
                  });
                }, (error) => {
                  Actions.login();
                });
            }}
            onLoginNotFound={() => {
              this.setState({
                loginButtonShow: true,
              });

              userRepo.doLogOut();

              settingsRepo.cleanUp();
            }}
            onError={() => {
              Toast.show('Something went wrong, please try again', Toast.SHORT);

              this.setState({
                loginButtonShow: true,
              });
            }}
            onCancel={() => {
              Toast.show('Request just canceled', Toast.SHORT);

              this.setState({
                loginButtonShow: true,
              });
            }}
            onPermissionsMissing={() => {
              Toast.show('Permission failed!', Toast.SHORT);

              this.setState({
                loginButtonShow: true,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 150,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  quoteContainer: {
    flex: 1,
  },
  quoteView: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  quote: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
    color: '#e1e1e1',
    backgroundColor: 'transparent',
    fontFamily: Fonts.openSans,
    fontWeight: 'bold',
  },
});
