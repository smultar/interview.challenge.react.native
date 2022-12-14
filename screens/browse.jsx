import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import scss from '../assets/styles/base';
import { Normalize } from '../utilities/font';
import { schools, searchSchools, specialties } from '../assets/internal';
import { TextLogo } from '../components/elements';

import Preview from '../components/preview';
import icons from '../assets/icons';

const SplashScreen = ({ navigation }) => {

    const [search, setSearch] = useState({
        value: '',
        filters: [],
        results: [...schools],
        options: false
    });

    // Search handling
    useEffect(() => {
        
        if (search.value == '') return setSearch({ ...search, results: [...schools] });
        if (search.value == null) return;

        let results = searchSchools({
            term: search?.value,
            properties: ['name']
        });

        if (results.hits.length == 0) return setSearch({ ...search, results: [] });

        results = results.hits.map((result) => result.document);

        // Filter results by filters
        // Remove results without filters
        if (search.filters.length > 0) {
            results = results.filter((result) => {
                let hasFilter = false;
                search.filters.forEach((filter) => {
                    if (result.specialty.includes(filter)) hasFilter = true;
                });
                return hasFilter;
            });
        }

        setSearch({ 
            ...search,
            results: results
        });

    }, [search.value]);

    // Filter handling
    useEffect(() => {



        let results;
        if (search.value == '' || search.value == null) {
            results = [...schools];
        }
        
        let previousSearch = searchSchools({ term: search?.value, properties: ['name'] });
        results = (previousSearch.hits.length == 0) ? results : previousSearch.hits.map((result) => result.document);

        if (search.filters.length > 0) {
            results = results.filter((result) => {
                let hasFilter = false;
                search.filters.forEach((filter) => {
                    if (result.specialty.includes(filter)) hasFilter = true;
                });
                return hasFilter;
            });

            setSearch({ ...search, results: results });
        }

    }, [search.filters]);


    return (
        <View style={[scss.frame]}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={[scss.full, scss.center, scss.browseHeader, { borderBottomWidth: 1, borderBottomColor: '#CFCFCF'}]}>
                <View style={scss.padded}>
                    <Text style={[scss.title, {fontSize: Normalize(24)}]}>Looking for a school in{'\n'}<Text style={scss.bold}>New York?</Text></Text>
                    <Text style={[scss.title, {fontSize: Normalize(14)}]}>Here's a great place to start.</Text>
                </View>
            </View>

            <View style={scss.padded}>
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: Normalize(8), marginTop: Normalize(20), paddingLeft: Normalize(10) }}>
                    <TextInput style={{color: 'black'}} value={search.value} placeholderTextColor='grey' placeholder='Search for a school' onChangeText={ text => setSearch({...search, value: text }) }></TextInput>
                    <TouchableOpacity style={{position: 'absolute', right: 4, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingRight: Normalize(14),  paddingLeft: Normalize(14) }} onPress={() => setSearch({ ...search, options: !search.options })}>
                        <Image source={icons.slider} style={{width: Normalize(16), height: Normalize(16)}}></Image>
                    </TouchableOpacity>
                </View>
                

                {/* Search Options */}
                <View style={{ maxHeight: search.options ? Normalize(20000) : 0, overflow: 'hidden', height: '100%'}}>
                        <View style={scss.frame}>
                            {/* Activities */}
                            <View style={[ scss.full, { marginTop: Normalize(20), paddingBottom: Normalize(20) } ]}>
                                <View style={[ scss.rowCenter, scss.spaceRow ]}>
                                    <TextLogo icon={icons.specialize} text={'Specializations'} size={14} color='black' margin={Normalize(10)} bold />
                                    <TextLogo text={`(${search.filters.length}) Filters`} size={12} color={'#CFCFCF'}/>
                                </View>
                                <View style={{ marginTop: Normalize(10 ) }}>
                                    <ScrollView style={{ height: '57%', borderBottomWidth: 1, borderBottomColor: '#CFCFCF' }} showsVerticalScrollIndicator={false}>
                                    { specialties.map((specialty, index) => {
                                                let has = search.filters.find(item => item == specialty);
                                                    return (
                                                        <TouchableOpacity key={index} style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(10), backgroundColor: has ? 'black' : '#F2F2F2', borderRadius: Normalize(10), padding: Normalize(10) }]}onPress={() => setSearch({ ...search, filters: has ? search.filters.filter(item => item != specialty) : [...search.filters, specialty] })}>
                                                            <TextLogo icon={icons.hash} text={specialty} size={12} color={has ? 'white' : 'black'} tint={has ? 'white' : 'black'}/>
                                                        </TouchableOpacity>
                                                    )
                                            }
                                        )
                                    }
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                        

                </View>

                {/* Search Results */}
                <View style={{ height: '47.6%'}}>
                    {   search.results.length == 0 && 
                        <View style={[scss.center, scss.full, { marginTop: Normalize(20) }]}>
                            <Text style={[scss.title, {fontSize: Normalize(14), color: 'black'}]}>No results found for <Text style={scss.bold}>{search.value}</Text></Text>
                        </View>
                    }
                    <FlatList data={search.results} extraData={search.results} renderItem={({item}) => <Preview key={item.dbn} school={item} navigation={navigation}></Preview>} showsVerticalScrollIndicator={false}></FlatList>
                </View>

            </View>
            
        </View>
    );
};

export default SplashScreen;