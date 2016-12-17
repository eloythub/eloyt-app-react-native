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

import * as Progress from 'react-native-progress';

const modeUploadInProgress = 0;
const modeUploadFailed     = 1;
const modeUploadSuccessful = 2;

export default class UploadSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: props.queue,
      mode: modeUploadInProgress,
    };
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
          {
            // Progress bar when upload is in progress
            this.state.mode === modeUploadInProgress
              ?
                <View style={style.progressContainerModeInProgress}>
                  <Progress.Bar 
                    style={style.progress} 
                    indeterminate={false} 
                    progress={0} 
                    width={Dimensions.get('window').width - 55} 
                    height={5} 
                    color={'white'}
                  />
                </View>
              : null
          }
          {
            // Progress bar when upload has been failed
            this.state.mode === modeUploadFailed
              ?
                <View style={style.progressContainerModeUploadFialed}>
                  <Progress.Bar 
                    style={style.progress}
                    progress={1} 
                    width={Dimensions.get('window').width - 100} 
                    height={5} 
                    color={'red'} 
                  />
                </View>
              : null
          }
          {
            // Progress bar when upload is uploaded successfull
            this.state.mode === modeUploadSuccessful
              ?
                <View style={style.progressContainermodeUploadSuccessful}>
                  <Progress.Bar 
                    style={style.progress}
                    progress={1} 
                    width={Dimensions.get('window').width - 55} 
                    height={5} 
                    color={'lime'} 
                  />
                </View>
              : null
          }
          {
            // Show retry button in case of upload failure
            this.state.mode === modeUploadFailed
              ?
                <View style={style.retryContainer}>
                  <TouchableOpacity onPress={this.retryUpload.bind()}>
                    <Icon name="ios-refresh-outline" style={style.icon} />
                  </TouchableOpacity>
                </View>
              : null
          }
          {
            // Show Cancel button in case of failure or upload being in progress
            this.state.mode === modeUploadFailed || this.state.mode === modeUploadInProgress
              ?
                <View style={style.cancelContainer}>
                  <TouchableOpacity onPress={this.cancelUpload.bind()}>
                    <Icon name="ios-close" style={style.icon} />
                  </TouchableOpacity>
                </View>
              : null
          }
          {
            // Success mark when upload is uploaded successfull
            this.state.mode === modeUploadSuccessful
              ?
                <View style={style.successContainer}>
                  <Icon name="ios-checkmark" style={style.icon} />
                </View>
              : null
          }
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
  cancelContainer: {
    position: 'absolute',
    right: 0,
    width: 45,
    height: 45,
  },
  successContainer: {
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
  progressContainerModeUploadFialed: {
    width: Dimensions.get('window').width - 90,
    position: 'absolute',
    right: 45,
    left: 0,
    height: 45,
  },
  progressContainerModeInProgress: {
    width: Dimensions.get('window').width - 90,
    position: 'absolute',
    right: 45,
    left: 0,
    height: 45,
  },
  progressContainermodeUploadSuccessful: {
    width: Dimensions.get('window').width - 90,
    position: 'absolute',
    right: 45,
    left: 0,
    height: 45,
  },
  progress: {
    marginTop: 20,
    marginLeft: 10,
  },
});

UploadSection.propTypes = {
  queue: PropTypes.object,
};
