import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, FlatList, TextInput } from 'react-native';

import scss from '../assets/styles/base';
import { Normalize } from '../utilities/font';
import { getSchools } from '../assets/internal';

import Preview from '../components/preview';

const SplashScreen = ({ navigation, route }) => {
    const { dbn } = route.params;
    const school = getSchools(dbn);

    console.log(school);

    return (
        <View style={[scss.frame]}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={[scss.full, scss.center, scss.browseHeader, { borderBottomWidth: 1, borderBottomColor: '#CFCFCF'}]}>
                <View style={scss.padded}>
                    <Text style={[scss.title, {fontSize: Normalize(14), color: '#979797'}]}>{school.address}</Text>
                    <Text style={[scss.title, {fontSize: Normalize(24), width: '90%' }]}>{school.name}</Text>
                </View>
            </View>

            <View style={scss.padded}>
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: Normalize(8), marginTop: Normalize(20)}}>
                </View>
                
                <View>
                    
                </View>

            </View>
            
            
        </View>
    );
};

export default SplashScreen;