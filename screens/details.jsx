import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

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
                                        if (index == 0) return <Tag key={index} text={sport} size={10} marginL={20} marginT={0}/>
                                        return <Tag key={index} text={sport} size={10} marginL={10} marginT={0}/>
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
            <ScrollView style={scss.full}>
                <View style={scss.frame}>
                    <View style={scss.padded}>

                        {/* Description */}
                        <View style={{ marginTop: Normalize(20)}}>
                            <TextLogo text={'Description'} size={14} color='black' margin={Normalize(10)} bold />
                            <View style={{ marginTop: Normalize(10 ) }}>
                                <TextLogo text={school.description} size={12} color='#979797' margin={Normalize(10)}/>
                            </View>
                        </View>

                        {/* SAT Scores */}
                        <SAT scores={school.scores}/>

                        {/* Extra Activities */}
                        <View style={[ scss.full, { marginTop: Normalize(20)} ]}>
                            <TextLogo icon={icons.sports} text={'Extracurricular Activities'} size={14} color='black' margin={Normalize(10)} bold />
                            <View style={[ scss.rowCenter, { flexWrap: 'wrap', marginTop: Normalize(10) } ]}>
                                { school?.sports && school?.sports.length > 0 && school.sports.map((sport, index) => <Tag key={index} text={sport} size={12} color='black' marginL={0} marginR={10} marginT={10} />) }
                            </View>
                        </View>

                        {/* Contact */}
                        <View style={[ scss.full, { marginTop: Normalize(20), paddingBottom: Normalize(20) } ]}>
                            <TextLogo text={'Contact Information'} size={14} color='black' margin={Normalize(10)} bold />
                            <View style={{ marginTop: Normalize(10 ) }}>
                                {/* Writing */}
                                { school?.website &&
                                    <TouchableOpacity style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(0), backgroundColor: '#F2F2F2', borderRadius: Normalize(10), padding: Normalize(10) }]}>
                                        <TextLogo icon={icons.website} text={'Visit website'} size={12} color='black' />
                                        <TextLogo text={school.website} size={12} color='black' />
                                    </TouchableOpacity>
                                }
                                {/* Writing */}
                                { school?.phone &&
                                    <TouchableOpacity style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(10), backgroundColor: '#F2F2F2', borderRadius: Normalize(10), padding: Normalize(10) }]}>
                                        <TextLogo icon={icons.phone} text={'Phone Number'} size={12} color='black' />
                                        <TextLogo text={school.phone} size={12} color='black' />
                                    </TouchableOpacity>
                                }
                                {/* Writing */}
                                { school?.email &&
                                    <TouchableOpacity style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(10), backgroundColor: '#F2F2F2', borderRadius: Normalize(10), padding: Normalize(10) }]}>
                                        <TextLogo icon={icons.email} text={'Email'} size={12} color='black' />
                                        <TextLogo text={school.email} size={12} color='black' />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
            
        </View>
    );
};

export default SplashScreen;