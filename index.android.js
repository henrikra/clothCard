import {AppRegistry, UIManager} from 'react-native';

import App from './src/components/App';

UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('clothCard', () => App);