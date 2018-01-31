/**
* This is the messages page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import AsyncStorage from 'react-native';
import { Container, View, Icon, Left, Button, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import Colors from '../Colors';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Newsletter extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        messages: [],
      }
  }


  componentWillMount() {
      AsyncStorage.getItem('token')
.then((value) => {
         fetch('https://shiraishi.ksmz.moe/api/chat',
         {
          method: 'get',
          dataType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + value
          }
         })
          .then((response) => response.json())
          .then((responseJson) => {
            //let obj = responseJson;
            //obj.data.map((item, index) => {
 //this.setState({name: JSON.stringify(item.product.name)});
 //this.setState({image: JSON.stringify(item.product.image)});
 //this.setState({price: JSON.stringify(item.product.price)});
 //Alert.alert(JSON.stringify(item.product));
});
          })
          .catch((error) => {
            console.error(error);
          });
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'mao test',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://picsum.photos/400?image=329',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }


  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} /> 
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title="Messages" />
           <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
              />
            
      </Container>
    );
  }

  
}