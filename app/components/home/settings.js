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

export default class Settings extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          Settings Page
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
});