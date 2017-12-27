/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert, AsyncStorage, LocalStorage, StyleSheet, Switch } from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 30,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

export default class ChangeDetails extends Component {
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

 _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
 _onFocus = (field) => console.log("focusing", field);

  render() {
    var left = (
      <Left style={{flex:1, zIndex: 2}}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1, zIndex: 2}}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
       return (
       	 <Container style={{backgroundColor: '#F5F5F5', zIndex : 2}}>
       	  <Navbar left={left} right={right} title="CREDIT CARD DETAILS" style={{zIndex : 2}} />
      <View style={s.container}>


        { this.state.useLiteCreditCardInput ?
          (
            <LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
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