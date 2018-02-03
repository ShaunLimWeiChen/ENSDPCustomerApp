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

export default class ProfileDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
      };
  }


  componentWillMount()
  {
     AsyncStorage.getItem('user').then((value) =>
{
  if (value)
  {
    this.setState(username: value);
  }
});
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
        <Navbar left={left} right={right} title="Profile Page" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor}}>Profile Page </Text>
            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}>{this.state.username}</Text>
          </View>
          {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.changepass()} style={{backgroundColor: Colors.navbarBackgroundColor, width: 150, marginTop: 20}}>
              <Text style={{color: '#fdfdfd', marginLeft: 20}}>Change Password</Text>
            </Button>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.creditcardinput()} style={{backgroundColor: Colors.navbarBackgroundColor, width: 150, marginTop: 20}}>
              <Text style={{color: '#fdfdfd', marginLeft: 20}}>Credit Card Input</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  changepass() {
    Actions.Home;
  }

  creditcardinput() {
    Actions.ChangeDetails;
  }
}