import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  FBLoginManager,
} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <TouchableHighlight onPress={() => {
            FBLoginManager.logout(() => {
              Actions.login();
            });
          }}>
          <Text>Logout</Text>
        </TouchableHighlight>
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
