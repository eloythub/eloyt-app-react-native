import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

export default class SettingsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.state = props;

    this.setState(this.state);
  }

  render() {
    return (
      <View style={style.listContainer}>
        <View style={style.listItemContainer}>
          <Text style={style.item}>
            {this.state.caption}
          </Text>
          <Switch
            style={style.switch}
            onValueChange={(value) => {
              this.setState({
                switchValue: value,
              });

              this.props.onChange(value);
            }}
            value={this.state.defaultValue} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  listContainer: {
    height: 45,
    marginBottom: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#FFFFFF'
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    color: '#000',
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.openSans,
  },
  switch: {
    position: 'absolute',
    right: 20,
    top: -5,
  },
});

SettingsListItem.propTypes = {
  caption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.bool.isRequired,
};
