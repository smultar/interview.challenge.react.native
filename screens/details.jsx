import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, FlatList, TextInput, ScrollView } from 'react-native';

import scss from '../assets/styles/base';
import { Normalize } from '../utilities/font';
import { getSchools } from '../assets/internal';

import { Tag, TextLogo } from '../components/elements';
import SAT from '../components/sat';
import icons from '../assets/icons';

const SplashScreen = ({ navigation, route }) => {
    const { dbn } = route.params;
    const school = getSchools(dbn);

    console.log(school);

    return (
        <View style={[scss.frame]}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={[scss.full, scss.center, scss.browseHeader, { borderBottomWidth: 1, borderBottomColor: '#CFCFCF'}]}>
                <View style={scss.padded}>
                    <Text style={[scss.title, {fontSize: Normalize(14), color: '#979797'}]}>{school.location}</Text>
                    <Text style={[scss.title, {fontSize: Normalize(24), width: '90%' }]}>{school.name}</Text>
                </View>
                { school?.perks && school?.perks.length > 0 && 
                    <View style={[ scss.row, { marginTop: Normalize(10) }]}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                school.perks.map((sport, index) => {
                                        if (index == 0) return <Tag key={index} text={sport} size={10} marginL={20}/>
                                        return <Tag key={index} text={sport} size={10} marginL={10}/>
                                    }
                                )
                            }
                        </ScrollView>
                    </View>
                }
                <View style={[scss.padded, scss.rowCenter, { marginTop: Normalize(10) }]}>
                    <TextLogo icon={icons.attendance} text={`${school.attendance}% (Attendance rate)`} size={12} color='black' margin={Normalize(10)}/>
                    <TextLogo icon={icons.sun} text={`${school.start} (Attendance rate)`} size={12} color='black' margin={Normalize(10)}/>
                </View>

            </View>

            <View style={scss.padded}>
                <View style={{ marginTop: Normalize(20)}}>
                    <TextLogo text={'Description'} size={14} color='black' margin={Normalize(10)} bold />
                    <TextLogo text={school.description} size={12} color='#979797' margin={Normalize(10)}/>
                </View>
                <SAT scores={school.scores} />
                
                <View>
                    
                </View>

            </View>
            
            
        </View>
    );
};

export default SplashScreen;