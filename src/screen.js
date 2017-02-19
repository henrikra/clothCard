import {Dimensions} from 'react-native';

import {isAndroid} from './platform';

export const {width: screenWidth} = Dimensions.get('window');
export const screenHeight = Dimensions.get('window').height + (isAndroid ? -20 : 20);
export const halfScreenWidth = screenWidth / 2;
export const halfScreenHeight = screenHeight / 2;