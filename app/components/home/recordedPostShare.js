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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFS from 'react-native-fs';

export default class RecordedPostShare extends Component {
  constructor (props) {
    super(props);

    this.state = {
      postDescription: '',
      videoFilePath: this.props.navigationState.videoFilePath,
      deleteVideoAfterRecord: this.props.navigationState.deleteVideoAfterRecord,
    };
  }

  pressSendPost() {
    Actions.pop({
      popNum: 2,
      refresh: {
        uploadData: {
          videoFilePath: this.state.videoFilePath,
          postDescription: this.state.postDescription,
          deleteVideoAfterRecord: this.state.deleteVideoAfterRecord,
        },
      },
    });
  }

  render() {
    return (
      <View style={style.wrapper}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false} 
        />
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
              underlineColorAndroid='transparent'
              onChangeText={(postDescription) => this.setState({postDescription})}
              value={this.state.postDescription}
            />
          </View>
          <View style={style.sendButtonContainer}>
            <Button title="Post" onPress={this.pressSendPost.bind(this)} />
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
  textBox: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    margin: 10,
    marginBottom: 0,
  },
  sendButtonContainer: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
