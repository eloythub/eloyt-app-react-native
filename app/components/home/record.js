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
          type={Camera.constants.Type.front}
          >

          <View style={style.flashContrainer}>
            <TouchableOpacity>
              <View style={style.flashView}>
                <Icon name="ios-flash" style={style.flashIcon} />
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
  },
  readyToStartIcon: {
    fontSize: 45,
    color: '#afafaf',
    marginTop: 9,
    marginLeft: 16,
  },
  flashContrainer: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flashView: {
    flex: 0,
    backgroundColor: '#efefef',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: 40,
    height: 40,
  },
  flashIcon: {
    fontSize: 30,
    color: '#afafaf',
    marginTop: 3,
    marginLeft: 11,
  },
});
