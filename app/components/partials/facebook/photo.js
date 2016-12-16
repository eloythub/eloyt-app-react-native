import React, {Component, PropTypes} from 'react';
import {
  Image,
  View,
} from 'react-native';
import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

import profileAvatar from 'eloyt/app/assets/images/profile-avatar.png';

export default class FBPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    };
  }

  componentDidMount() {
    const width = this.props.width;

    userRepo.getLoginCredential().then((data) => {
      const user = data.userData.credentials;
      const api = `https://graph.facebook.com/v2.3/${user.userId}/picture` +
        `?width=${width}&redirect=false&access_token=${user.token}`;

      fetch(api)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
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
    let photo = this.state.photo;

    return (
      <View>
        {
          photo
          ? <Image
              style={{
                  height: photo.height,
                  width: photo.width,
                  borderColor: '#aaa',
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              source={{uri: photo.url}}
            />
          : <Image
              style={{
                height: this.props.width,
                width: this.props.width,
                borderColor: '#aaa',
                borderWidth: 2,
                borderRadius: 40,
              }}
              source={profileAvatar} />
        }
      </View>
    );
  }
}

FBPhoto.propTypes = {
  width: PropTypes.any.isRequired,
};
