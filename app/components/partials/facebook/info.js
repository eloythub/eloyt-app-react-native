import React, {
  Component, PropTypes
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import UsersRepo from 'eloyt/common/repositories/users';
const userRepo = new UsersRepo();

export default class FBInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
    };
  }

  componentDidMount() {
    userRepo.getLoginInfo().then((data) => {
      this.setState({
        info: {
          id: data._id,
          name: data.name,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
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
