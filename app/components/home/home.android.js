import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  DrawerLayoutAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


import * as Progress from 'react-native-progress';
import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { NavigationView } from '../partials/drawer-view';
import UploadSection from '../partials/home/upload-section';

import RNFS from 'react-native-fs';

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;

    this.state = {
      uploadRequest: null,
      progressBarWaiting: false,
    };
  }

  componentWillReceiveProps(res) {
    const uploadRequest = res.root.props.navigationState.cleanup ? null : res.root.props.navigationState.uploadData;

    this.setState({
      uploadRequest,
    });
  }

  uploadCleanup() {
    this.setState({ uploadRequest: null });

    Actions.refresh({
      cleanup: true,
    });
  }

  deleteVideoAfterRecord(deleteVideoAfterRecord, videoFilePath) {
    if (deleteVideoAfterRecord) {
      RNFS.unlink(videoFilePath.replace('file://', ''));
    }
  }

  uploadCanceled(deleteVideoAfterRecord, videoFilePath) {
    this.uploadCleanup();

    this.deleteVideoAfterRecord(deleteVideoAfterRecord, videoFilePath);
  }

  uploadSuccess(data, deleteVideoAfterRecord, videoFilePath) {
    this.uploadCleanup();

    this.deleteVideoAfterRecord(deleteVideoAfterRecord, videoFilePath);
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false}
        />

        <UploadSection
          style={style.uploadSection}
          queue={this.state.uploadRequest}
          canceled={this.uploadCanceled.bind(this)}
          success={this.uploadSuccess.bind(this)}
        />

        {
          this.state.progressBarWaiting
            ? <Progress.Bar
                style={style.loadingProgress}
                indeterminate={true}
                width={Dimensions.get('window').width}
                height={2}
                color="#545454"
              />
            : null
        }

        <ScrollView></ScrollView>

        <View style={style.footerMenu}>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
              this.root.refs.drawerLayout.openDrawer();
            }} />
            <MenuItem name="record" icon="ios-videocam" onPress={() => {
              Actions.record();
            }} />
          </MenuContainer>
        </View>
      </View>
    );
  }
}

/*
inventory:

<MenuItem name="Search" icon="ios-search" onPress={() => {
  Actions.search();
}} />
*/

HomeView.propTypes = {
  root: PropTypes.any.isRequired
};

export default class Home extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref="drawerLayout"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavigationView root={this} /> }>
        <HomeView root={this}/>
      </DrawerLayoutAndroid>
    );
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  footerMenu: {
    backgroundColor: '#000',
  },
  loadingProgress: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    position: 'absolute',
  },
  uploadSection: {
    position: 'absolute',
  },
});
