import React, { Component } from 'react';
import { WebView, BackHandler } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Container, Content, View, Left, Right, Button, Icon, Grid, Col } from 'native-base';

import Navbar from '../component/Navbar';

export default class SignupWeb extends Component {
	 componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };
  render() {
     var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );

    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="REGISTER" />
      <WebView
        source={{uri: 'https://shiraishi.ksmz.moe/register'}}
        style={{marginTop: 20}}
      />
      </Container>
    );
  }
}