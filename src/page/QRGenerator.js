import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { Container, Content, View, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux'; 
import {
    AppRegistry,
    StyleSheet,
    TextInput
} from 'react-native';

import Colors from '../Colors';
import Text from '../component/Text';
import Product from '../component/Product';
import Navbar from '../component/Navbar';
 
export default class QRGenerator extends Component {
  state = {
    text: 'mayu.ksmz.moe',
  };
 
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
       <Navbar left={left} title="PAYMENT" />
      <View style={styles.container}>
        <Text style={{fontSize: 18}}>Scan this QR Code to complete payment.</Text>
        <Text>{"\n"}</Text>
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
      </Container>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        width: 200
    }
});
 