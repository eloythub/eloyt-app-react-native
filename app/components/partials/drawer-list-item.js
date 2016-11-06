import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'ideaStudio/common/fonts';

export default class DrawerListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let caption = this.props.caption;
    let icon = this.props.icon;
    let onPress = this.props.onPress;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={style.listContainer}>
          <View style={style.listItemContainer}>
            <Icon name={icon} style={style.icon} />
            <Text style={style.item}>
              {caption}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  listContainer: {
    width: 300,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    backgroundColor: '#808288',
    marginBottom: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#ffffff',
    fontSize: 25,
    width: 30,
    textAlign: 'center',
  },
  item: {
    color: '#ffffff',
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.openSans,
  },
});

DrawerListItem.propTypes = {
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
