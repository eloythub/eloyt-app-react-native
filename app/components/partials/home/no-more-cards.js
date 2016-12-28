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

import logo from 'eloyt/app/assets/images/logo-no-background.png';

import * as Progress from 'react-native-progress';

export default class NoMoreCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={style.cardContainer}>
        <Image style={style.logo} source={logo} />
        <Text style={style.text}>There is no one around you at the moment</Text>
        <TouchableOpacity onPress={this.props.onRefresh}>
          <Text style={style.refreshText}><Icon style={style.refreshIcon} name="ios-refresh-outline" /> Check Again</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: Fonts.openSans,
  },
  refreshText: {
    marginTop: 30,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
  },
  refreshIcon: {
    fontSize: 20,
  },
});

NoMoreCards.propTypes = {
  onRefresh: PropTypes.func,
};
