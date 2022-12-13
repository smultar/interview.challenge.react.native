import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, FlatList, TextInput } from 'react-native';

import scss from '../assets/styles/base';
import { Normalize } from '../utilities/font';
import { schools, searchSchools } from '../assets/internal';

import Preview from '../components/preview';

const SplashScreen = ({ navigation }) => {

    const [search, setSearch] = useState({
        value: '',
        filters: [],
        results: [...schools]
    });

    useEffect(() => {
        
        if (search.value == '') return;
        if (search.value == null) return;
        console.log(search.value);

        let results = searchSchools({
            term: search?.value,
            properties: ['name']
        });

        console.log(search.value, results);
        if (results.hits.length == 0) return setSearch({ ...search, results: [] });

        results = results.hits.map((result) => result.document);

        //console.log(results);

        setSearch({ 
            ...search,
            results: results
        });


    }, [search.value]);


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
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: Normalize(8), marginTop: Normalize(20)}}>
                    <TextInput style={{color: 'black'}} value={search.value} placeholderTextColor='grey' placeholder='Search for a school' onChangeText={ text => setSearch({...search, value: text }) }></TextInput>
                </View>
                
                <View>
                    
                </View>

                <FlatList data={search.results} extraData={search.results} renderItem={({item}) => <Preview key={item.dbn} school={item} navigation={navigation}></Preview>}></FlatList>
            </View>
            
            
        </View>
    );
};

export default SplashScreen;