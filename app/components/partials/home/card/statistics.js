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

export default class Statistics extends Component {
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
        <View style={style.thumbsUpContainer}>
          <Icon name="md-thumbs-up" style={style.thumbsUpIcon}/>
          <Text style={style.thumbsUp}>{this.state.countThumbsUp}</Text>
        </View>
        <View style={style.thumbsDownContainer}>
          <Icon name="md-thumbs-down" style={style.thumbsDownIcon}/>
          <Text style={style.thumbsDown}>{this.state.countThumbsDown}</Text>
        </View>
        <View style={style.viewsContainer}>
          <Icon name="md-eye" style={style.viewsIcon}/>
          <Text style={style.views}>{this.state.countViews}</Text>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 18,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: 3,
    left: 3,
  },
  thumbsUpContainer: {
    position: 'absolute',
    top: 1,
    right: 5,
    width: 80,
    height: 30,
    backgroundColor: 'transparent',
  },
  thumbsUpIcon: {
    color: '#98FB98',
    fontSize: 20,
    marginLeft: 9,
    marginTop: 2,
  },
  thumbsUp: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    left: 32,
    top: 0,
  },
  thumbsDownContainer: {
    position: 'absolute',
    top: 1,
    right: 80,
    width: 80,
    height: 40,
    backgroundColor: 'transparent',
  },
  thumbsDownIcon: {
    color: '#DC143C',
    fontSize: 20,
    marginLeft: 9,
    marginTop: 6,
  },
  thumbsDown: {
    fontSize: 20,
    color: 'white',
    position: 'absolute',
    left: 32,
    top: 0,
  },
  viewsContainer: {
    position: 'absolute',
    top: 1,
    left: 5,
    width: 80,
    height: 40,
    backgroundColor: 'transparent',
  },
  viewsIcon: {
    color: 'white',
    fontSize: 20,
    marginLeft: 9,
    marginTop: 4,
  },
  views: {
    fontSize: 20,
    color: 'white',
    position: 'absolute',
    left: 32,
    top: 0,
  },
});

Statistics.propTypes = {
  countThumbsUp: PropTypes.number,
  countThumbsDown: PropTypes.number,
  countViews: PropTypes.number,
};
