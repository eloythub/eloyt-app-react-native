import React, {Component, PropTypes} from 'react';
import {
  Image,
  View,
} from 'react-native';
import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

import ApiRepo from 'eloyt/common/repositories/api';
const apiRepo = new ApiRepo();

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

    userRepo.getLoginInfo().then((data) => {
      this.setState({
        photo: {
          url: apiRepo.resourceStreamUrl(data._id, 'avatar', data.avatar),
        },
      });
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
                  height: this.props.width,
                  width: this.props.width,
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
