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

export default class MyVideos extends Component {
  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    Actions.home();

    return true;
  }

  render() {
    return (
      <View>
        <Text>
          My Videos Page
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
});
