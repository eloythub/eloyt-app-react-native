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
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

export default class Record extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: true,
      torchVisibility: false,
      torch: false,
    }
  }

  capture() {
    let base = this;

    this.camera.capture()
      .then((data) => {
        console.log('capture finished', data)
      })
      .catch(err => {
        console.error('error', err)
      });

    setTimeout(() => {
      base.camera.stopCapture();
    }, 20 * 1000);
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
              this.state.torchVisibility
              ? <View style={style.torchView}>
                  <Icon name="ios-flash" style={style.torchIcon} />
                </View>
              : null
            }
            </TouchableOpacity>
          </View>
          <View style={style.changeTypeContrainer}>
            <TouchableOpacity onPress={this.swapMode.bind(this)}>
              <View style={style.changeTypeView}>
                <Icon name="ios-swap-outline" style={style.changeTypeIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        <View style={style.toolBarContainer}>
          <TouchableOpacity onPress={this.capture.bind(this)}>
            <View style={style.capture}>
              <Icon name="ios-camera" style={style.readyToStartIcon} />
            </View>
          </TouchableOpacity>
        </View>
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
    height: windowWidth,
    width: windowWidth,
  },
  capture: {
    flex: 0,
    backgroundColor: '#efefef',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: 70,
    height: 70,
    marginBottom: 50,
  },
  toolBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
  },
  readyToStartIcon: {
    fontSize: 45,
    color: '#afafaf',
    marginTop: 9,
    marginLeft: 16,
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
