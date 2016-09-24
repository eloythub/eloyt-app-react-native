import React, {
  Component, PropTypes
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  UsersRepo
} from 'ideaStudio/common/repository';

export default class FBInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
    };
  }

  componentWillMount() {
    let base = this;

    UsersRepo.getLoginInfo().then((data) => {
      const user = data.userData.credentials;
      const api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

      fetch(api)
        .then((response) => response.json())
        .then((responseData) => {
          base.setState({
            info: {
              id: user.userId,
              name: responseData.name,
              email: responseData.email,
            },
          });
        })
        .done();
    });
  }

  render() {
    let info      = this.state.info;
    let data      = this.props.data;
    let viewStyle = this.props.viewStyle;
    let textStyle = this.props.textStyle;

    return (
      <View style={viewStyle}>
        {
          info && info.hasOwnProperty(data)
          ? <Text style={textStyle}>{ info[data] }</Text>
          : <Text style={textStyle}>Loading ...</Text>
        }
      </View>
    );
  }
}

FBInfo.propTypes = {
  data: PropTypes.string.isRequired,
  viewStyle: PropTypes.any.isRequired,
  textStyle: PropTypes.any.isRequired,
};
