
import { View, Text, Image } from 'react-native';
import scss from '../assets/styles/base';
import icons from '../assets/icons';
import { Normalize } from '../utilities/font';

const TextLogo = ({ text, icon, bold, size, color, margin }) => {

    // If the text is bold, then the text will be bold. Size is the size of the text. If no size is specified, then the default size is 14px.
    // If no color is specified, then the default color is black. 
    // If no margin is specified, then the default margin is 0.

    return (
        <View style={scss.rowCenter}>
            { icon && 
                <Image style={[scss.browseContentImage, { width: 24, height: 24 }]} source={icon ?? icons.compass} resizeMode='contain'></Image>
            }
            <Text style={[bold ? scss.bold : scss.font, { fontSize: Normalize(size) ?? Normalize(14), color: color ?? 'black', marginRight: margin ?? 10 }, ]}>{text ?? 'No text provided'}</Text>
        </View>
    )
}

export { TextLogo };