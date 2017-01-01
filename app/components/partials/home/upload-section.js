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

import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

import * as Progress from 'react-native-progress';

import ApiRepo from 'eloyt/common/repositories/api';
const apiRepo = new ApiRepo();

import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

const modeUploadInProgress = 0;
const modeUploadFailed     = 1;
const modeUploadSuccessful = 2;

export default class UploadSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: props.queue,
      mode: modeUploadInProgress,
      progress: 0,
      geoLocation: null,
    };

    this.xhr = null;
  }

  componentDidMount() {
    this.fetchGeoLocation();
  }

  componentWillReceiveProps(props) {
    const queue = props.queue;

    this.setState({ 
      queue,
      mode: modeUploadInProgress,
      progress: 0,
    }); // This will recieve upload object from record scene

    if (!this.state.geoLocation) {
      Toast.show('In order to Upload your video, we need your GEO Location. Please enable your GPS and try again.' +
        '\nPlease retry in case of GPS being already enaibled.', Toast.SHORT);

      this.setState({
        mode: modeUploadFailed,
      });

      this.fetchGeoLocation();

      return;
    }

    if (queue) {
      this.startUpload(queue);
    }
  }

  fetchGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geoLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.setState({ geoLocation });
      },
      (error) => {
        Toast.show('Failed to Load Your GPS, Please Make sure Your GPS is enabled.', Toast.SHORT);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
    );
  }

  uploadProgress(progressEvent) {
    const progress = progressEvent.loaded / progressEvent.total;

    this.setState({
      progress: progress,
    });
  }

  startUpload(queue) {
    const userInfo = userRepo.getLoginInfo().then((userInfo) => {

      // Prepare the data to upload
      const data = new FormData();

      data.append('userId', userInfo._id);
      data.append('geoLocationLatitude', this.state.geoLocation.latitude);
      data.append('geoLocationLongitude', this.state.geoLocation.longitude);
      data.append('file', {
        uri: queue.videoFilePath,
        type: 'image/mp4',
        name: 'file'
      });

      // Upload the data and handle the progress
      apiRepo.postWithProgress(
        '/stream/upload/video',
        {
          method: 'post',
          body: data
        },
        this.uploadProgress.bind(this),
        (xhr) => { this.xhr = xhr }
      ).then((res) => {
        if (res.status !== 200) {
          is.setState({
            mode: modeUploadFailed,
          });

          return;
        }

        this.setState({
          mode: modeUploadSuccessful,
        });

        setTimeout(() => {
          this.props.success(res.response, queue.deleteVideoAfterRecord, queue.videoFilePath);
        }, 2000); // Pause for 2 sec in order to show upload was successfull
      }, (err) => {
        // upload failed
        // console.log(err);

        this.setState({
          mode: modeUploadFailed,
        });
      });
    }, (err) => {
      // fetching user has been failed
      this.setState({
        mode: modeUploadFailed,
      });
    });
  }

  cancelUpload() {
    this.props.canceled(this.state.queue.deleteVideoAfterRecord, this.state.queue.videoFilePath);

    if (this.xhr) {
      this.xhr.abort();
      this.xhr = null;
    }
  }

  retryUpload() {
    this.componentWillReceiveProps(this.props);
  }

  render() {
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
                    indeterminate={this.state.progress === 0}
                    progress={this.state.progress} 
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
                  <TouchableOpacity onPress={this.retryUpload.bind(this)}>
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
                  <TouchableOpacity onPress={this.cancelUpload.bind(this)}>
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
  canceled: PropTypes.func,
  success: PropTypes.func,
};
