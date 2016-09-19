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

export default class Record extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          Record Page
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
});
