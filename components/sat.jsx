
import { View, Text, Image, TouchableOpacity } from 'react-native';
import scss from '../assets/styles/base';
import icons from '../assets/icons';
import { Normalize } from '../utilities/font';
import { TextLogo } from './elements';
import { schools } from '../assets/internal';

const SAT = ({ scores }) => {

    // School is an object that contains all of the specialty, location, and name of the school.
    // If no icon is provided, then the default icon is the school icon.
    // ? Id is the id of the school. This is used to navigate to the school page.

    return (
        <TouchableOpacity style={{ backgroundColor: '#F2F2F2', borderRadius: Normalize(8), marginTop: Normalize(20)}}>
            <View style={[scss.satTop, { borderBottomWidth: 1, borderBottomColor: 'white' }]}>
                <TextLogo icon={icons.award} text='Scholastic Assessment Test (SAT)' bold size={14} color='black' margin={10}/>
                <TextLogo text={scores?.number? `Average scores amongst ${scores.number} students` : 'Average scores amongst students'} size={12} color='#9A9A9A'/>
            </View>
            
            <View style={[scss.satBot, scss.col]}>
                {/* Reading */}
                <View style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(15) }]}>
                    <TextLogo icon={icons.reading} text={'Reading'} size={12} color='black' />
                    <TextLogo text={scores.reading} size={12} color='black' />
                </View>
                {/* Math */}
                <View style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(15) }]}>
                    <TextLogo icon={icons.math} text={'Math'} size={12} color='black' />
                    <TextLogo text={scores.math} size={12} color='black' />
                </View>
                {/* Writing */}
                <View style={[scss.rowCenter, scss.spaceRow, scss.full, { marginTop: Normalize(15) }]}>
                    <TextLogo icon={icons.writing} text={'Writing'} size={12} color='black' />
                    <TextLogo text={scores.writing} size={12} color='black' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SAT;