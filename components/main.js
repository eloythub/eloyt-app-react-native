import React, { PropTypes, Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import Fonts from '../eloyt/fonts';
import Common from '../eloyt/common';

let logo = require('./../assets/images/logo.png');

export default class Main extends Component {
    buttonPress () {
        console.log('pressed');
    }
    render() {
        var _this = this;

        return (
            <View style={ style.wrapperLogo }>
                <Image source={ logo } />
                <Text style={ style.appName }>
                    Idea Studio
                </Text>
                <View style={ style.separator }/>
                <FBLogin style={ style.facebookLoginButton }
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                permissions={["email","user_friends"]}
                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                onLogin={function(data){
                    console.log("Logged in!");
                    console.log(data);
                    _this.setState({ user : data.credentials });
                }}
                onLogout={function(){
                    console.log("Logged out.");
                    _this.setState({ user : null });
                }}
                onLoginFound={function(data){
                    console.log("Existing login found.");
                    console.log(data);
                    _this.setState({ user : data.credentials });
                }}
                onLoginNotFound={function(){
                    console.log("No user logged in.");
                    _this.setState({ user : null });
                }}
                onError={function(data){
                    console.log("ERROR");
                    console.log(data);
                }}
                onCancel={function(){
                    console.log("User cancelled.");
                }}
                onPermissionsMissing={function(data){
                        console.log("Check permissions!");
                        console.log(data);
                    }}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    wrapperLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: -50,
    },
    appName: {
        fontFamily: Fonts.openSans,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    separator: {
        marginTop: 70,
    },
    facebookLoginButton: {
    },
});
