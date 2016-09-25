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

const showHideTransitions = [
  'fade',
  'slide',
];

function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

export default class Record extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: true,
      torchVisibility: false,
      torch: false,
      isRecording: false,

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

    this.stopCaptureTimeout = setTimeout(() => {
      this.setState({
        isRecording: false,
      });

      base.camera.stopCapture();
    }, (20 + 1) * 1000); // x second for limitaton
  }

  stopCapture() {
    this.setState({
      isRecording: false,
    });
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
          <View style={style.torchContrainer}>
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
          <View style={style.changeTypeContrainer}>
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
          <View style={style.toolBarContainer}>
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
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#e9e9e9',
    width: 70,
    height: 70,
    marginBottom: 50,
  },
  stopCapture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#e9e9e9',
    width: 70,
    height: 70,
    marginBottom: 50,
  },
  toolBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  },
  torchIcon: {
    fontSize: 30,
    color: '#afafaf',
    marginTop: 3,
    marginLeft: 11,
  },
  changeTypeContrainer: {
    flex: 2,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  changeTypeView: {
    flex: 0,
    backgroundColor: '#efefef',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: 40,
    height: 40,
  },
  changeTypeIcon: {
    fontSize: 28,
    color: '#afafaf',
    marginTop: 4,
    marginLeft: 6,
  },
});
