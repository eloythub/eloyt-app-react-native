import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  BackAndroid,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

import Spinner from 'react-native-loading-spinner-overlay';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import SettingsRepo from 'eloyt/common/repositories/settings';
const settingsRepo = new SettingsRepo();

const showHideTransitions = [
  'fade',
  'slide',
];

function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

const maxRecordLimit = 120; // 2 min = 120 sec
const minRecordLimit = 15; // 15 sec

const CameraTypes = {
  frontCamera: false,
  backCamera: true,
};

export default class Record extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: true,
      torchVisibility: false,
      torch: false,
      isRecording: false,
      progressbar: 0,

      animated: false,
      hidden: true,
      showHideTransition: getValue(showHideTransitions, 0),

      // Load Camera
      loadCamera: false,

      waiting: true,

      // Camera Settings
      settingList: {
        'initFrontCameraByDefault': false,
        'highVideoQualityRecord': false,
        'deleteVideoAfterRecord': false,
      },
    }
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentDidMount(){
    settingsRepo.load().then((data) => {
      if (typeof data !== 'object') {
        return;
      }

      this.setState({
        waiting: false,
        loadCamera: true,
        settingList: {
          'initFrontCameraByDefault': data.initFrontCameraByDefault,
          'highVideoQualityRecord': data.highVideoQualityRecord,
          'deleteVideoAfterRecord': data.deleteVideoAfterRecord,
        },
      });

      // Set the initial camera type, true means frontCamera, false means backCamera
      this.switchCamera(data.initFrontCameraByDefault ? CameraTypes.frontCamera : CameraTypes.backCamera)
    });
  }

  onBackAndroid() {
    if (this.state.isRecording) {
      this.stopCapture(true);
    }

    return true;
  }

  startCapture() {
    let base = this;

    this.setState({
      isRecording: true,
      progressbar: 0
    });

    this.recordCanceled = false;
    this.camera.capture()
      .then((data) => {
        let finalCounter = base.counter * 10;

        this.setState({
          isRecording: false,
        });

        if (!base.recordCanceled && finalCounter > minRecordLimit && finalCounter <= maxRecordLimit) {
          console.log('send to post scene:', data)

          Actions.recordedPostShare();

          return;
        }

        // Remove the original video base on setting's options
      })
      .catch(err => {
        console.error('error', err)

        this.setState({
          isRecording: false,
        });
      });


    this.setState({
      isRecordPostable: false,
    });

    this.counter = 0;
    this.counterInterval = setInterval(() => {
      let progress = (this.counter * 100) / maxRecordLimit; // Calculate the progress

      this.setState({
        progressbar: progress * 10,
      });

      if (this.counter * 10 > minRecordLimit && !this.state.isRecordPostable) {
        this.setState({
          isRecordPostable: true,
        });
      }

      if (this.state.progressbar >= 100) {
        this.stopCapture();

        return;
      }

      this.counter = this.counter + 0.01;
    }, 100);
  }

  stopCapture(cancel) {
    this.setState({
      isRecording: false,
    });

    clearInterval(this.counterInterval);

    if (this.state.isRecording) {
      this.camera.stopCapture();

      if (cancel) {
        this.recordCanceled = true;

        return;
      }
    }
  }

  capture() {
    if (this.state.isRecording) {
        this.stopCapture();

        return;
    }

    this.startCapture();
  }

  torchMode() {
    this.setState({
      torch: !this.state.torch,
    });
  }

  switchCamera(type) {
    this.setState({
      torchVisibility: type,
      type: !type,
    });
  }

  toggleCamera() {
    this.setState({
      torchVisibility: this.state.type,
      type: !this.state.type,
    });
  }

  backButton() {
    this.stopCapture(true);

    Actions.home();
  }

  render() {
    return (
      <View style={style.container}>
        <Spinner visible={this.state.waiting} />
        <StatusBar
          hidden={this.state.hidden}
          showHideTransition={this.state.showHideTransition}
          animated={this.state.animated}
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={style.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.video}
          captureQuality={
            this.state.settingList.highVideoQualityRecord
              ? Camera.constants.CaptureQuality.high
              : Camera.constants.CaptureQuality.medium
          }
          orientation={Camera.constants.Orientation.portrait}
          defaultOnFocusComponent={true}
          type={this.state.type ? Camera.constants.Type.front : Camera.constants.Type.back}
          torchMode={this.state.torch ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off}
          >
          <View style={style.topContainer}>

          </View>
          <View style={style.toolBarContainer}>
            <TouchableOpacity onPress={this.torchMode.bind(this)}>
            {
              !this.state.isRecording && this.state.torchVisibility
              ? <View style={style.torchView}>
                  <Icon name="ios-flash" style={style.torchIcon} />
                </View>
              : null
            }
            </TouchableOpacity>
          </View>
          <View style={style.toolBarContainer}>
            <TouchableOpacity onPress={this.backButton.bind(this)}>
              {
                !this.state.isRecording
                ? <View style={style.backButton}>
                    <Icon name="md-arrow-back" style={style.backButtonIcon} />
                  </View>
                : null
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={this.capture.bind(this)}>
            {
              this.state.isRecording
              ? <AnimatedCircularProgress
                  style={style.stopCapture}
                  size={70}
                  width={5}
                  fill={this.state.progressbar}
                  tintColor={this.state.isRecordPostable ? "green" : "#b30000"}
                  backgroundColor="#e9e9e9" >
                    {
                      (fill) => (
                        <Icon name="ios-square" style={style.stopCaptureIcon} />
                      )
                    }
                  </AnimatedCircularProgress>
              : <View style={style.capture}>
                  <Icon name="ios-videocam" style={style.readyToStartIcon} />
                </View>
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleCamera.bind(this)}>
              {
                !this.state.isRecording
                ? <View style={style.changeTypeView}>
                    <Icon name="ios-swap-outline" style={style.changeTypeIcon} />
                  </View>
                : null
              }
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  preview: {
    flex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topContainer: {
    flex: 2,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#e9e9e9',
    width: 70,
    height: 70,
    marginBottom: 30,
  },
  stopCapture: {
    flex: 0,
    marginBottom: 30,
  },
  stopCaptureIcon: {
    position: 'absolute',
    fontSize: 35,
    color: '#b30000',
    marginTop: -52,
    marginLeft: 22,
  },
  backButton: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'transparent',
    width: 70,
    height: 70,
    marginBottom: 30,
    marginRight: 20,
  },
  toolBarContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    fontSize: 45,
    color: '#e9e9e9',
    marginTop: 6,
    marginLeft: 13,
  },
  readyToStartIcon: {
    fontSize: 45,
    color: '#e9e9e9',
    marginTop: 6,
    marginLeft: 13,
  },
  torchContrainer: {
    flex: 0,
    paddingTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  torchView: {
    flex: 0,
    backgroundColor: '#efefef',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  torchIcon: {
    fontSize: 30,
    color: '#afafaf',
    marginTop: 3,
    marginLeft: 11,
  },
  changeTypeView: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'transparent',
    width: 70,
    height: 70,
    marginBottom: 30,
    marginLeft: 20,
  },
  changeTypeIcon: {
    fontSize: 45,
    color: '#e9e9e9',
    marginTop: 7,
    marginLeft: 11,
  },
});
