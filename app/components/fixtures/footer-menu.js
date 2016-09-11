import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
});

export class MenuContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        {this.props.children}
      </View>
    );
  }
}

export class MenuItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={style.menuItemContainer}>
          <Icon name={this.props.icon} size={50} />
        </View>
      </TouchableOpacity>
    );
  }
}
