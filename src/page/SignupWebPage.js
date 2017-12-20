import React, { Component } from 'react';
import { WebView, BackHandler } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';


export default class SignupWeb extends Component {
	 componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };
  render() {
    return (
      <WebView
        source={{uri: 'https://shiraishi.ksmz.moe/register'}}
        style={{marginTop: 20}}
      />
    );
  }
}