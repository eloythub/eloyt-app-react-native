import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

export default class UploadSection extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }


  componentWillReceiveProps(props) {
    const queue = props.queue;

    this.setState({ queue });
  }

  cancelUpload() {

  }

  retryUpload() {

  }

  render() {
    console.log(this.state);
    return this.state.queue
      ? (
        <View style={style.uploadSectionContainer}>
          <View style={style.progressContainer}>
          </View>
          <View style={style.retryContainer}>
            <TouchableOpacity onPress={this.retryUpload.bind()}>
              <Icon name="ios-refresh-outline" style={style.icon} />
            </TouchableOpacity>
          </View>
          <View style={style.removeContainer}>
            <TouchableOpacity onPress={this.cancelUpload.bind()}>
              <Icon name="ios-close" style={style.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )
      : null
  }
}

const style = StyleSheet.create({
  uploadSectionContainer: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: 45,
  },
  item: {
    color: 'white',
    fontFamily: Fonts.openSans,
  },
  retryContainer: {
    position: 'absolute',
    right: 45,
    width: 45,
    height: 45,
  },
  removeContainer: {
    position: 'absolute',
    right: 0,
    width: 45,
    height: 45,
  },
  icon: {
    fontSize: 40,
    color: 'white',
    left: 15,
    top: 3,
  },
  progressContainer: {
    width: Dimensions.get('window').width - 90,
    position: 'absolute',
    right: 45,
    left: 0,
    height: 45,
    backgroundColor: 'grey',
  },
});

UploadSection.propTypes = {
  queue: PropTypes.object,
};
