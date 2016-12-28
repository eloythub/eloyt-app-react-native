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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  menuItemContainer: {
    height: 50,
    width: 60,
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
          <Icon name={this.props.icon} size={50} />
        </View>
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
