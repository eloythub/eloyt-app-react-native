import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RecordedPostShare extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    Actions.home(this);

    return true;
  }

  render() {
    return (
      <View style={style.container}>
        <StatusBar hidden={false} />
        <Text>
          Post Page
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({

});
