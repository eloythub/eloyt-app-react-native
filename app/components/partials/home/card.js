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

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

import * as Progress from 'react-native-progress';

export default class Card extends Component {
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
        <Text>test</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});

Card.propTypes = {
  // queue: PropTypes.object,
};
