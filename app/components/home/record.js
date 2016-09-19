import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

export default class Record extends Component {
  constructor (props) {
    super(props);
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
          >
          <Text style={style.capture}>
            [Capture]
          </Text>
        </Camera>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});
