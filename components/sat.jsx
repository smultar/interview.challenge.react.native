
import { View, Text, Image, TouchableOpacity } from 'react-native';
import scss from '../assets/styles/base';
import icons from '../assets/icons';
import { Normalize } from '../utilities/font';
import { TextLogo } from './elements';

const SAT = ({ score }) => {

    // School is an object that contains all of the specialty, location, and name of the school.
    // If no icon is provided, then the default icon is the school icon.
    // ? Id is the id of the school. This is used to navigate to the school page.

    return (
        <TouchableOpacity style={{ backgroundColor: '#F2F2F2', borderRadius: Normalize(8), marginTop: Normalize(20)}}>
            <View style={[scss.browsePaddingLower, { borderBottomWidth: 1, borderBottomColor: 'white' }]}>
                <TextLogo icon={icons.award} text='Scholastic Assessment Test (SAT)' bold size={14} color='black'/>
                <TextLogo text={score?.number? `Average scores amongst ${score.number} students` : 'Average scores amongst students'} size={14} color='#9A9A9A'/>

            </View>
            
            <View style={[scss.browsePaddingLower, scss.spaceRow]}>
                <TextLogo text={school.location ?? 'Location'} icon={icons.location} size={12} color='black' />
                <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: Normalize(25) }} onPress={() => navigation.navigate('Details', { dbn: school.dbn })}>
                    <Text style={{ color: 'white', padding: Normalize(10) }}>View School</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default SAT;