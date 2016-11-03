import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Toast from 'react-native-simple-toast';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

import Fonts from 'ideaStudio/common/fonts';
import UsersRepo from 'ideaStudio/common/repositories/users';
const userRepo = new UsersRepo();

import logo from 'ideaStudio/app/assets/images/logo.png';
import background from 'ideaStudio/app/assets/images/login-cover.jpg';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: false
    };
  }

  doLogin(res, base) {
    if (res.statusCode !== 200) {
      Toast.show('something went wrong, please try again later', Toast.SHORT);

      FBLoginManager.logout(() => {
        userRepo.doLogOut();
        Actions.refresh();
      });

      base.setState({
        waiting: false,
      });

      return;
    }

    base.setState({
      waiting: false,
    });

    Actions.home(base);
  }

  doLoginRevert(error, base) {
    Toast.show(error, Toast.SHORT);

    FBLoginManager.logout(() => {
      userRepo.doLogOut();
      Actions.refresh();
    });

    base.setState({
      waiting: false,
    });
  }


  render() {
    let base = this;

    return (
      <View style={style.wrapperLogo}>
        <Spinner visible={this.state.waiting} />
        <View style={style.bgImageWrapper}>
          <Image source={background} style={style.bgImage} />
        </View>
        <ScrollView style={style.quoteContainer}>
          <View style={style.quoteView}>
            <Image source={logo}/>
            <Text style={style.quote}>
              INSTANT SUCCESS
            </Text>
          </View>
        </ScrollView>
        <View>
          <Text style={style.desc}>
            Get ready to Explore your Ideas and passion
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

            onLogin={(user) => {
              base.setState({
                waiting: true,
              });

              userRepo.doLogin('facebook', user).then((res) => {
                base.doLogin(res, base);
              }, (error) => {
                base.doLoginRevert(error, base);
              });
            }}
            onLogout={() => {
              userRepo.doLogOut();
            }}
            onLoginFound={(user) => {
              base.setState({
                waiting: true,
              });

              userRepo.doLogin('facebook', user).then(base.doLogin, base.doLoginRevert);
            }}
            onLoginNotFound={() => {
              userRepo.doLogOut();
            }}
            onError={() => {
              Toast.show('Something went wrong, please try again', Toast.SHORT);
            }}
            onCancel={() => {
              Toast.show('Request just canceled', Toast.SHORT);
            }}
            onPermissionsMissing={() => {
              Toast.show('Permission failed!', Toast.SHORT);
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
    marginTop: 50,
    color: '#e1e1e1',
    fontFamily: Fonts.openSans,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.openSans,
    marginBottom: 20,
  },
});
