import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Fonts from '../eloyt/fonts';

export default class Main extends Component {
    render() {
        return (
            <View>
                <Text>
                    hello everybody { Fonts.ubuntuC }
                </Text>
            </View>
        );
    }
}
