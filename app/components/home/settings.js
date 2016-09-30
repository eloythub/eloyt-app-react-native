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
