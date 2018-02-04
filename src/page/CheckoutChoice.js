/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert, AsyncStorage, LocalStorage } from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class CheckoutChoice extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }


  componentWillMount()
  {
}



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
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="QR CODE" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor}}>Process Payment </Text>
          </View>
          {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => Actions.qrgenerator()} style={{backgroundColor: Colors.navbarBackgroundColor, width: 170, marginTop: 20}}>
              <Text style={{color: '#fdfdfd', marginLeft: 20}}>GENERATE QR CODE</Text>
            </Button>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => Actions.qrcode()} style={{backgroundColor: Colors.navbarBackgroundColor, width: 140, marginTop: 20}}>
              <Text style={{color: '#fdfdfd', marginLeft: 20}}>SCAN QR CODE</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

}