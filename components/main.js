import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import Button from 'react-native-button';
import Fonts from '../eloyt/fonts';
import Common from '../eloyt/common';

let logo = require('./../assets/images/logo.png');

export default class Main extends Component {
    buttonPress () {
        console.log('pressed');
    }
    render() {
        return (
            <View style={ style.wrapperLogo }>
                <Image source={ logo } />
                <Text style={ style.appName }>
                    Idea Studio
                </Text>
                <Button
                    style={ style.facebookLoginButton }
                    onPress={ () => this.buttonPress() }
                    >
                    Facebook Login
                </Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    wrapperLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: -50
    },
    appName: {
        fontFamily: Fonts.openSans,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    facebookLoginButton: {
        backgroundColor: 'red'
    }
});
