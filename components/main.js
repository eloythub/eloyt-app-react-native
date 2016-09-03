import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import Fonts from '../eloyt/fonts';
import Common from '../eloyt/common';

let logo = require('./../assets/images/logo.png');

export default class Main extends Component {
    render() {
        return (
            <View style={ style.wrapperLogo }>
                <Image source={ logo } />
            </View>
            <View>
                <Text style={ style.appName }>
                    Idea Studio
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    wrapperLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontFamily: Fonts.openSans,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
