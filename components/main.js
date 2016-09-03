import React, { Component } from 'react';
import { 
    View, 
    Text,
    Stylesheet,
} from 'react-native';

import Fonts from '../eloyt/fonts';

export default class Main extends Component {
    render() {
        return (
            <View>
                <Text style={style.introText}>
                    hello everybody
                </Text>
            </View>
        );
    }
}

const style = Stylesheet.create({
    'introText': {
        'fontFamily': Fonts.ubuntuC
    }
});
