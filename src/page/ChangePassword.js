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

export default class ChangePassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        hasError: false,
        errorText: '',
        loggedIn: false
      };
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
        <Navbar left={left} right={right} title="CHANGE PASSWORD" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor}}>Change Password </Text>
            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}>Change your password here </Text>
          </View>
          <Item>
              <Icon active name='ios-lock' style={{color: "#687373"}} />
              <Input placeholder='Current Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          <Item>
              <Icon active name='ios-lock' style={{color: "#687373"}} />
              <Input placeholder='New Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
                    <Item>
              <Icon active name='ios-lock' style={{color: "#687373"}} />
              <Input placeholder='Confirm New Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.login()} style={{backgroundColor: Colors.navbarBackgroundColor, width: 80, marginTop: 20}}>
              <Text style={{color: '#fdfdfd', marginLeft: 20}}>Submit</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  login() {
    dismissKeyboard();
    const {username} = this.state;
    const {password} = this.state;

    if(username == '' || password == '')
{
  this.setState({hasError: true, errorText: 'Email/password cannot be empty!'});
}
else
{

    fetch ('https://shiraishi.ksmz.moe/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.message === "Unauthorized")
      {
        alert("Invalid username or password!");
      }
      else
      {
        this.setState({loggedIn:true});
        AsyncStorage.setItem('user', username);
        AsyncStorage.setItem('token', responseJson.access_token)
        Actions.home();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
}