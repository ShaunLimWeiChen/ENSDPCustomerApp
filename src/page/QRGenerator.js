import React, { Component } from 'react';
import { Text } from 'react-native';
import QRCode from 'react-native-qrcode';
import { Container, Content, View, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux'; 
import {
    AppRegistry,
    StyleSheet,
    TextInput
} from 'react-native';
 
export default class QRGenerator extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <Text style={{fontSize: 18}}>Scan this QR Code to complete payment</Text>
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
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
 