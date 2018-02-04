/**
* This is the Product component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { View, Col, CardItem, Body, Button } from 'native-base';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from './Text';

export default class product extends Component {

  render() {
    return(

      <Card>
  <CardImage source={{uri: {this.props.product.image}} style={{width:340, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10}}/>
  <CardTitle title= {this.props.product.name} subtitle={"$" + (this.props.product.prices)/100.toFixed(2)}/>
  <CardAction>
    <CardButton
      onPress={() => {this.pressed()}}
      title="View"
    />
    <CardButton
      onPress={() => {this.pressed()}}
      title="View"
    />
  </CardAction>
</Card>
    );
  }

  pressed() {
    Actions.product({product: this.props.product});
  }
}

const style = {
  button: {flex: 1, height: 150},
  image: {height: 150, width: 340},
  leftMargin: {
    marginBottom: 7
  },
  rightMargin: {
    marginLeft: 0,
    marginRight: 7,
    marginBottom: 7
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 0,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  price: {
    fontSize: 20,
    zIndex: 1000,
    backgroundColor: '#fdfdfd'
  },
  line: {
    height: 1,
    backgroundColor: '#7f8c8d',
    position: 'absolute',
    top: '52%'
  }
}
