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
        </Camera>

        <View style={style.toolBarContainer}>
          <TouchableOpacity onPress={() => {
              console.log('Start Recording');
            }}>
            <View style={style.capture}>
              <Icon name="ios-camera" style={style.readyToStartIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    marginBottom: 20,
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
});
