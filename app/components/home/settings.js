import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Settings extends Component {
  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    Actions.home(this);

    return false;
  }

  render() {
    return (
      <View>
        <Text>
          Settings Page
          {'\n'}
          roling camera by :
            |-> Front Camera (Recomended)
            |-> Back Camera
            |-> Last Usage
          Video Quality
            |-> High
            |-> Medium
          Remove Videos After Each Record
            |-> No
            |-> Yes (PHONE MEMORY)
            |-> Yes (SD CARD)
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
});
