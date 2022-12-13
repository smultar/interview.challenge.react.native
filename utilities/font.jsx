import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Scale size based on screen size
const scale = SCREEN_WIDTH / 320;

const Normalize = (size) => {
    const newSize = size * scale 
    if (Platform.OS === 'ios') return Math.round(PixelRatio.roundToNearestPixel(newSize))
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export { Normalize };