import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFS from 'react-native-fs';

export default class RecordedPostShare extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text: '',
      videoFilePath: this.props.navigationState.videoFilePath,
      backgroundSnapshot: this.props.navigationState.snapshot,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      RNFS.unlink(this.props.navigationState.snapshot).then(() => {}, () => {});
    }, 0);
  }

  onBackAndroid() {
    Actions.record();

    return true;
  }

  pressSendPost() {
  }

  render() {
    return (
      <View style={style.wrapper}>
        <StatusBar hidden={false} />
        <ScrollView>
          <View>
            <TextInput
              style={style.textBox}
              multiline={true}
              numberOfLines={4}
              placeholder="Tell people your store..."
              returnKeyType="done"
              textAlignVertical="top"
              maxLength={200}
            />
          </View>
          <View>
            <Image style={style.backgroundImage} source={{uri: this.state.backgroundSnapshot}} />
            <Icon name="ios-videocam" style={style.playSign} />
            <View style={style.sendButtonContainer}>
              <Button style={style.sendButton} title="Post" onPress={this.pressSendPost.bind(this)} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    marginTop: 54,
  },
  backgroundImage: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  textBox: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    marginBottom: 0,
  },
  sendButtonContainer: {
    width: Dimensions.get('window').width / 2.7,
    position: "absolute",
    right: 10,
    top: 10,
  },
  playSign: {
    position: 'absolute',
    fontSize: 40,
    color: 'white',
    left: ((Dimensions.get('window').width / 2) / 2),
    top: ((Dimensions.get('window').height / 2) / 2) - 10,
  },
});
