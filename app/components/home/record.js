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
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

import ProgressBar from 'ideaStudio/app/components/partials/progress-bar';

const showHideTransitions = [
  'fade',
  'slide',
];

function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

const maxLimit = 10; // 2 min = 120 sec

export default class Record extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: true,
      torchVisibility: false,
      torch: false,
      isRecording: false,
      progressbar: 0,
      timeCounter: 0,

      // status
      animated: false,
      hidden: true,
      showHideTransition: getValue(showHideTransitions, 0),
    }
  }

  startCapture() {
    let base = this;

    this.setState({
      isRecording: true,
      progressbar: 0
    });

    this.camera.capture()
      .then((data) => {
        console.log('capture finished', data)

        this.setState({
          isRecording: false,
        });
      })
      .catch(err => {
        console.error('error', err)

        this.setState({
          isRecording: false,
        });
      });

    this.counter = 0;
    this.counterInterval = setInterval(() => {
      let progress = (this.counter * 100) / maxLimit; // calculate the progress

      this.setState({
        progressbar: progress * 10,
        timeCounter: parseInt(this.counter * 10),
      });

      this.counter = this.counter + 0.01;
    }, 100);
  }

  stopCapture() {
    this.setState({
      isRecording: false,
    });
    clearInterval(this.counterInterval);
    this.camera.stopCapture();
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

  swapMode() {
    this.setState({
      torchVisibility: this.state.type,
      type: !this.state.type,
    });
  }

  backButton() {
    Actions.pop();
  }

  render() {
    return (
      <View style={style.container}>
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
          captureQuality={Camera.constants.CaptureQuality.high}
          orientation={Camera.constants.Orientation.portrait}
          defaultOnFocusComponent={true}
          type={this.state.type ? Camera.constants.Type.front : Camera.constants.Type.back}
          torchMode={this.state.torch ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off}
          >
          <ProgressBar
            fillStyle={{
              backgroundColor: '#b30000',
            }}
            backgroundStyle={{
              backgroundColor: 'transparent',
            }}
            style={{
              width: Dimensions.get('window').width,
            }}
            progress={this.state.progressbar}
            />
          <Text>
            Progress: {this.state.progressbar}
            {'\n'}
            Time: {this.state.timeCounter}
          </Text>
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
              ? <View style={style.stopCapture}>
                  <Icon name="ios-square" style={style.stopCaptureIcon} />
                </View>
              : <View style={style.capture}>
                  <Icon name="ios-videocam" style={style.readyToStartIcon} />
                </View>
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={this.swapMode.bind(this)}>
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
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#e9e9e9',
    width: 70,
    height: 70,
    marginBottom: 30,
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
  stopCaptureIcon: {
    fontSize: 35,
    color: '#b30000',
    marginTop: 12,
    marginLeft: 17,
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
