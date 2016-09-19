import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class MyVideos extends Component {
  constructor (props) {
    super(props);
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
