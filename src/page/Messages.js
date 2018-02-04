/**
* This is the messages page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
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
      conversations: [],
    }
  }


  componentWillMount() {
    var chats = require('./datatest/chat.json');
    this.setState({conversations: chats});
    //Alert.alert(this.state.messages);
    //Alert.alert(JSON.stringify(this.state.messages));
    //Alert.alert(JSON.stringify(this.state.conversations));
    for (var i=0; i<chats.length; i++){

    }
    this.setState({
      messages: [
      {
        _id: 1,
        text: chats[1].message,
        createdAt: chats[1].sent,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://picsum.photos/400?image=329',
        },
      },
      ],
       messages: [
      {
        _id: 2,
        text: chats[2].message,
        createdAt: chats[2].sent,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://picsum.photos/400?image=329',
        },
      },
      ],
       messages: [
      {
        _id: 3,
        text: chats[3].message,
        createdAt: chats[3].sent,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://picsum.photos/400?image=329',
        },
      },
      ],
       messages: [
      {
        _id: 4,
        text: chats[4].message,
        createdAt: chats[4].sent,
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