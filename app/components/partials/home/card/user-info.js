import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  onPressMore() {

  }

  render() {
    return (
      <View style={style.mainContainer}>
        <Image style={style.avatar} source={{uri: this.state.avatarUrl}} />
        <Text style={style.firstName}>{this.state.firstName}</Text>
        <Text style={style.date}>Few Seconds Ago</Text>
        <View style={style.moreContainer}>
          <TouchableOpacity onPress={this.onPressMore.bind(this)}>
            <Icon name="ios-more" style={style.more} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 18,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 3,
    left: 3,
  },
  avatar: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
  },
  firstName: {
    position: 'absolute',
    top: 15,
    left: 50,
    fontSize: 15,
    color: 'white',
    fontFamily: Fonts.openSans,
  },
  date: {
    position: 'absolute',
    top: 16,
    right: 45,
    fontSize: 13,
    color: 'white',
    fontFamily: Fonts.openSans,
    backgroundColor: 'transparent',
  },
  moreContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  more: {
    color: 'white',
    fontSize: 35,
    marginLeft: 9,
    marginTop: 3,
  },
});

UserInfo.propTypes = {
  avatarUrl: PropTypes.string,
  firstName: PropTypes.string,
};
