import React, {
  Component,
  PropTypes,
} from 'react';

import {
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
    borderColor: '#e8e8e8',
    borderTopWidth: 1,
  },
  menuItemContainer: {
    height: 40,
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

MenuContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export class MenuItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={style.menuItemContainer}>
          <Icon name={this.props.icon} size={40} />
        </View>
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
