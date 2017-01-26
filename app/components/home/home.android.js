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

import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

import StreamRepo from 'eloyt/common/repositories/stream';
const streamRepo = new StreamRepo();

import Toast from 'react-native-simple-toast';
import * as Progress from 'react-native-progress';
import { MenuContainer, MenuItem } from '../fixtures/footer-menu';
import { NavigationView } from '../partials/drawer-view';
import UploadSection from '../partials/home/upload-section';

import RNFS from 'react-native-fs';

import SwipeCards from 'react-native-swipe-cards';
import Card from '../partials/home/card';
import NoMoreCards from '../partials/home/no-more-cards';

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.root = props.root;

    this.state = {
      uploadRequest: null,
      progressBarWaiting: false,
      cards: [],
      outOfCards: true,
      pauseVideoPlayer: false,
    };
  }

  componentDidMount() {
    this.fetchVideos();
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

  doPauseVideo() {
    this.setState({
      pauseVideoPlayer: true,
    });
  }

  handleYup (card) {
  }

  handleNope (card) {
  }

  fetchVideos () {
    this.setState({
      cards: [],
      progressBarWaiting: true,
    });

    userRepo.getLoginInfo().then((userInfo) => {
      streamRepo.fetchProducedResources(userInfo._id, 20)
        .then((response) => {
          this.setState({
            cards: response.data,
            progressBarWaiting: false,
          });
        }, (error) => {
          Toast.show('Something went wrong, please retry again..', Toast.SHORT);

          this.setState({
            progressBarWaiting: false,
          });
        })
    }, (err) => {
      Toast.show('Something went wrong, please retry again..', Toast.SHORT);

      this.setState({
        progressBarWaiting: false,
      });
    });
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          hidden={false}
        />

        <View style={style.uploadSection}>
          <UploadSection
            queue={this.state.uploadRequest}
            canceled={this.uploadCanceled.bind(this)}
            success={this.uploadSuccess.bind(this)}
          />
        </View>

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

        <SwipeCards
          loop={false}
          style={style.swipeCards}
          cards={this.state.cards}

          renderCard={(cardData) => <Card {...cardData} pauseVideoPlayer={this.state.pauseVideoPlayer} />}
          renderNoMoreCards={() => <NoMoreCards inProgress={this.state.progressBarWaiting} onRefresh={this.fetchVideos.bind(this)} />}

          handleYup={this.handleYup.bind(this)}
          handleNope={this.handleNope.bind(this)}

          yupText="Like"
          noText="Dislike"

          containerStyle={style.swipeCardsContainer}
        />

        <View>
          <MenuContainer>
            <MenuItem name="menu" icon="ios-more" onPress={() => {
              this.doPauseVideo();

              this.root.refs.drawerLayout.openDrawer();
            }} />
            <MenuItem name="record" icon="ios-videocam" onPress={() => {
              this.setState({
                pauseVideoPlayer: true,
              });

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
  loadingProgress: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
  },
  uploadSection: {
    top: 0,
    flex: 0,
  },
  swipeCards: {
    top: 0,
    flex: 0,
  },
  swipeCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
