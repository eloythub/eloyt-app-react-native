import React, {Component, PropTypes} from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  UsersRepo
} from 'ideaStudio/common/repository';

import profileAvatar from 'ideaStudio/app/assets/images/profile-avatar.png';

export default class FBPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    };
  }

  componentWillMount() {
    let base  = this;
    const width = this.props.width;

    UsersRepo.getLoginInfo().then((data) => {
      const user = data.userData.credentials;
      const api = `https://graph.facebook.com/v2.3/${user.userId}/picture` +
        `?width=${width}&redirect=false&access_token=${user.token}`;

      fetch(api)
        .then((response) => response.json())
        .then((responseData) => {
          base.setState({
            photo: {
              url: responseData.data.url,
              height: responseData.data.height,
              width: responseData.data.width,
            },
          });
        })
        .done();
    });
  }

  render() {
    if(!this.state.hasOwnProperty('photo')) {
      return this.renderLoading();
    }

    let photo = this.state.photo;

    return (
      <View>
        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
              borderColor: '#aaa',
              borderWidth: 2,
              borderRadius: 40,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  }
  renderLoading() {
    return (
      <View>
        <Image
          style={{
            height: this.props.width,
            width: this.props.width,
            borderColor: '#aaa',
            borderWidth: 2,
            borderRadius: 3,
          }}
          source={profileAvatar} />
      </View>
    );
  }
}

FBPhoto.propTypes = {
  width: PropTypes.any.isRequired,
};
