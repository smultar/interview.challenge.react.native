import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

import icons from '../assets/icons';
import scss from '../assets/styles/base';

const SplashScreen = ({ navigation }) => {

    // Displays the splash screen for 2 seconds before navigating to the Browse screen
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Browse');
        }, 2000);
    }, []);

    return (
        <View style={[scss.frame, scss.center]}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <Image source={icons.compass} style={{ width: 40, height: 40 }} />
        </View>
    );
};

export default SplashScreen;