import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  BackAndroid,
  StatusBar,
  ScrollView,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import Fonts from 'ideaStudio/common/fonts';
import SettingsListItem from '../partials/settings-list-item';
import { LocalStorage } from 'ideaStudio/common/localStorage';

import SettingsRepo from 'ideaStudio/common/repositories/settings';
const settingsRepo = new SettingsRepo();

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingList: {
        'initFrontCameraByDefault': false,
        'highVideoQualityRecord': false,
        'deleteVideoAfterRecord': false,
      },
    };
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  componentDidMount() {
    let base = this;

    settingsRepo.load().then((data) => {
      base.setState({
        settingList: data,
      });
    });
  }

  updateSettingEntity(key, value) {
    const roleBackValue = this.state.settingList[key];

    this.state.settingList[key] = value;

    this.setState([this.state.settingList]);

    settingsRepo.save(key, value).then(() => {}, () => {
      this.state.settingList[key] = roleBackValue;

      this.setState([this.state.settingList]);
    });
  }

  onBackAndroid() {
    Actions.home(this);

    return false;
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <StatusBar hidden={false} />
        <ScrollView>
          <SettingsListItem
            caption="Initial Front Camera By Default"
            defaultValue={false}
            onChange={(value) => {
              this.updateSettingEntity('initFrontCameraByDefault', value);
            }} />
          <SettingsListItem
            caption="High Video Quality Record"
            defaultValue={false}
            onChange={(value) => {
              this.updateSettingEntity('highVideoQualityRecord', value);
            }} />
          <SettingsListItem
            caption="Delete Video After Record"
            defaultValue={false}
            onChange={(value) => {
              this.updateSettingEntity('deleteVideoAfterRecord', value);
            }} />
        </ScrollView>
        {
          Platform.OS === 'ios'
          ? null
          : <View style={style.footerMenu}>
            <MenuContainer>
              <MenuItem name="back" icon="md-arrow-back" onPress={() => {
                  Actions.home(this);
                }} />
            </MenuContainer>
          </View>
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapperLogo: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#EFEFF4',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.openSans,
  },
  footerMenu: {
    backgroundColor: '#000',
  },
});
