/**
* This is the start point of the app on the Android platform
* You can ignore this file since it only links to the src/Main.js file
**/

import {Platform} from 'react-native';
import ChromeIOS from './src/ChromeIOS';
import CustomTabsAndroid from './src/CustomTabsAndroid';
import {ANIMATIONS_SLIDE, ANIMATIONS_FADE} from './src/TabOption';
import type {TabOption as _TabOption} from './src/TabOption';

export type TabOption = _TabOption;
import { AppRegistry } from 'react-native';
import Main from './src/Main';
console.disableYellowBox = true;

const CustomTabs = Platform.OS === 'android' ? CustomTabsAndroid : ChromeIOS;
export {CustomTabs, ANIMATIONS_SLIDE, ANIMATIONS_FADE};

AppRegistry.registerComponent('Shop', () => Main);
