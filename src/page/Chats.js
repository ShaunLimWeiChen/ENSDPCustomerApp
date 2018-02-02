/**
* This is the messages page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Alert, ListView, StyleSheet, View, SectionList } from 'react-native';
import { Container, Icon, Left, Button, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import Colors from '../Colors';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Newsletter extends Component {

  render() {
    var left = (
      <Left style={{flex:1}}>
      <Button transparent onPress={() => Actions.pop()}>
      <Icon name="ios-close" size={38} style={{fontSize: 38}} /> 
      </Button>
      </Left>
      );
    return (
    	<Container style={{backgroundColor: '#fdfdfd'}}>
      <View style={styles.container}>
       <Navbar left={left} title="Chat" style={{marginTop: -10}} />
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
      </Container>
    );
  }
}

  const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})