import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import Fonts from 'eloyt/common/fonts';
import SettingsListItem from '../partials/settings-list-item';
import { LocalStorage } from 'eloyt/common/localStorage';

import SettingsRepo from 'eloyt/common/repositories/settings';
const settingsRepo = new SettingsRepo();

import Spinner from 'react-native-loading-spinner-overlay';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: true,
      settingList: {
        'initFrontCameraByDefault': false,
        'highVideoQualityRecord': false,
        'deleteVideoAfterRecord': false,
      },
    };
  }

  componentDidMount(){
    settingsRepo.load().then((data) => {
      if (typeof data !== 'object') {
        return;
      }

      this.setState({
        settingList: {
          'initFrontCameraByDefault': data.initFrontCameraByDefault,
          'highVideoQualityRecord': data.highVideoQualityRecord,
          'deleteVideoAfterRecord': data.deleteVideoAfterRecord,
        },
      });
    });
    settingsRepo.loadFromServer().then((data) => {
      this.setState({
        waiting: false,
        settingList: {
          'initFrontCameraByDefault': data.initFrontCameraByDefault,
          'highVideoQualityRecord': data.highVideoQualityRecord,
          'deleteVideoAfterRecord': data.deleteVideoAfterRecord,
        },
      });
    });
  }

  updateSettingEntity(key, value) {
    const roleBackValue = this.state.settingList[key];

    this.state.settingList[key] = value;

    let settingList = this.state.settingList;

    this.setState({ settingList });


    settingsRepo.save(key, value).then(() => {
      settingsRepo.loadFromServer().then(() => {
        Actions.refresh();
      });
    }, () => {
      this.state.settingList[key] = roleBackValue;

      settingList = this.state.settingList;

      this.setState({ settingList });

      Actions.refresh();
    });
  }

  render() {
    return (
      <View style={style.wrapperLogo}>
        <Spinner visible={this.state.waiting} />
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false}
        />
        <ScrollView>
          <SettingsListItem
            caption="Initial Front Camera By Default"
            defaultValue={this.state.settingList.initFrontCameraByDefault}
            onChange={(value) => {
              this.updateSettingEntity('initFrontCameraByDefault', value);
            }} />
          <SettingsListItem
            caption="High Video Quality Record"
            defaultValue={this.state.settingList.highVideoQualityRecord}
            onChange={(value) => {
              this.updateSettingEntity('highVideoQualityRecord', value);
            }} />
          <SettingsListItem
            caption="Delete Video After Record"
            defaultValue={this.state.settingList.deleteVideoAfterRecord}
            onChange={(value) => {
              this.updateSettingEntity('deleteVideoAfterRecord', value);
            }} />
        </ScrollView>
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
