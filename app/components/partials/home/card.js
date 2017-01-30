import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'eloyt/common/fonts';

import * as Progress from 'react-native-progress';

import Video from 'react-native-video';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import UserInfo from './card/user-info';
import Statistics from './card/statistics';

import ApiRepo from 'eloyt/common/repositories/api';
const apiRepo = new ApiRepo;

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.generateKey(),
      videoLoaded: false,
      currentDuration: 0,
      playingStatus: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      playingStatus: !props.pauseVideoPlayer,
    });
  }

  generateKey() {
    return Math.floor(Math.random() * 100000000) + 1;
  }

  onVideoLoaded() {
    this.setState({
      videoLoaded: true,
    });
  }

  pressPlayButton() {
    this.setState({
      playingStatus: true,
    });
  }

  pressPauseButton() {
    this.setState({
      playingStatus: false,
    });
  }

  onVideoProgress(progressProperties) {
    if (progressProperties.playableDuration === 0) {
      return;
    }

    let progress = ((progressProperties.currentTime * 100) / progressProperties.playableDuration) || 0;

    this.setState({
      currentDuration: progress,
    });
  }

  onVideoStart(progressProperties) {
    this.setState({
      currentDuration: 0,
      playingStatus: false,
    });
  }

  onVideoEnd() {
    this.setState({
      currentDuration: 100,
      playingStatus: false,
      key: this.generateKey(),
    });
  }

  renderPlayButton() {
    return (
      <TouchableOpacity onPress={this.pressPlayButton.bind(this)}>
        <AnimatedCircularProgress
          style={style.durationProgress}
          size={70}
          width={4}
          fill={this.state.currentDuration}
          tintColor="green"
          backgroundColor="#e9e9e9" >
            {
              (fill) => (
                <Icon name="ios-play" style={style.playIcon} />
              )
            }
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  }

  renderPauseButton() {
    return (
      <TouchableOpacity onPress={this.pressPauseButton.bind(this)}>
        <AnimatedCircularProgress
          style={style.durationProgress}
          size={70}
          width={4}
          tension={50}
          friction={100}
          fill={this.state.currentDuration}
          tintColor="green"
          backgroundColor="#e9e9e9" >
            {
              (fill) => (
                <Icon name="ios-pause" style={style.pauseIcon} />
              )
            }
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={style.cardContainer}>
        <View style={style.videoContainer}>
          <Image
            style={!this.state.playingStatus ? style.thumbnailStop : style.thumbnailPlaying}
            source={{uri: apiRepo.url(this.props.resourceThumbnailUri)}}/>
          <Video
            key={this.state.key}
            source={{uri: apiRepo.url(this.props.resourceUri)}}
            ref={(ref) => {
              this.player = ref
            }}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={!this.state.playingStatus}
            resizeMode="cover"
            repeat={this.state.repeat}
            playInBackground={false}       // Audio continues to play when app entering background.
            playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
            progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
            onLoad={this.onVideoLoaded.bind(this)}      // Callback when video loads
            onProgress={this.onVideoProgress.bind(this)}      // Callback every ~250ms with currentTime
            onLoadStart={this.onVideoStart.bind(this)}
            onEnd={this.onVideoEnd.bind(this)}
            // onError={this.videoError}      // Callback when video cannot be loaded
            style={!this.state.playingStatus ? style.videoStop : style.videoPlaying} />
          <UserInfo {...this.props.user} />
          <Statistics {...this.props.statistics} />
          <View style={style.playPauseContainer}>
            {
              this.state.playingStatus
              ? this.renderPauseButton()
              : this.renderPlayButton()
            }
          </View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  videoContainer: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#f5f5f5',
    margin: 5,
    marginBottom: 10,
  },
  videoPlaying: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    marginTop: 3,
  },
  videoStop: {
    flex: 0,
  },
  thumbnailPlaying: {
    flex: 0,
  },
  thumbnailStop: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  playPauseContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 40,
    left: (Dimensions.get('window').width - 16) / 2 - (70 / 2)
  },
  playIcon: {
    fontSize: 50,
    position: 'absolute',
    color: '#e9e9e9',
    marginTop: 10,
    marginLeft: 26,
  },
  pauseIcon: {
    fontSize: 50,
    position: 'absolute',
    color: '#e9e9e9',
    marginTop: 10,
    marginLeft: 23,
  },
  durationProgress: {
    flex: 0,
  },
});

Card.propTypes = {
  pauseVideoPlayer: PropTypes.bool,
  resourceUrl: PropTypes.string,
  user: PropTypes.object,
  statistics: PropTypes.object,
};
