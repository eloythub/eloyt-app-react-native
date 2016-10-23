import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackAndroid,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import Fonts from 'ideaStudio/common/fonts';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rollingCamera: '',
    };
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    Actions.home(this);

    return false;
  }

  optionList() {
    return this.refs['optionList'];
  }

  update(value) {
    console.log(value);
    this.setState({
      ...this.state,
      rollingCamera: value
    });
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <StatusBar hidden={false} />
        <ScrollView>
          <View>
            <Text>
              Rolling Camera:
            </Text>
            <Select
              width={250}
              ref="rollingCameraRef"
              optionListRef={this.optionList.bind(this)}
              defaultValue=""
              onSelect={this.update.bind(this)}>
              <Option>Alberta</Option>
              <Option>British Columbia</Option>
              <Option>Manitoba</Option>
              <Option>New Brunswick</Option>
              <Option>Newfoundland and Labrador</Option>
              <Option>Northwest Territories</Option>
              <Option>Nova Scotia</Option>
              <Option>Nunavut</Option>
              <Option>Ontario</Option>
              <Option>Prince Edward Island</Option>
              <Option>Quebec</Option>
              <Option>Saskatchewan</Option>
              <Option>Yukon</Option>
            </Select>
          </View>
          <Text class="title">

            Settings Page
            {'\n'}
            roling camera by :
              |-> Front Camera (Recomended)
              |-> Back Camera
              |-> Last Usage
            Video Quality
              |-> High
              |-> Medium
            Store Videos After Each Record
              |-> No
              |-> Yes (PHONE MEMORY)
              |-> Yes (SD CARD)
          </Text>
        </ScrollView>
        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="back" icon="md-arrow-back" onPress={() => {
                Actions.home(this);
              }} />
          </MenuContainer>
        </View>

        <OptionList ref="optionList"/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.openSans,
  },
  footerMenu: {
    backgroundColor: '#000',
  },
});
