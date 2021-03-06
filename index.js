/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {ConfgiureNotificaionts} from '_src/config/localNotifications';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('_config/music'));
ConfgiureNotificaionts();
