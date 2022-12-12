import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

// import { icons } from '../assets/icons';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Browse');
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <Image source={icons.logo} style={{ width: 200, height: 200 }} />
        </View>
    );
};

export default SplashScreen;