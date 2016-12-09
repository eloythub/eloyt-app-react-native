import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFS from 'react-native-fs';

export default class RecordedPostShare extends Component {
  constructor (props) {
    super(props);

    this.state = {
      videoFilePath: this.props.navigationState.videoFilePath,
      backgroundSnapshot: this.props.navigationState.snapshot,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      RNFS.unlink(this.props.navigationState.snapshot).then(() => {}, () => {});
    }, 0);
  }

  onBackAndroid() {
    Actions.record();

    return true;
  }

  render() {
    return (
      <View>
        <StatusBar
          hidden={true}
        />
        <Image style={style.backgroundImage} source={{uri: this.state.backgroundSnapshot}} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
  },
});
