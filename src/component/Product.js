/**
* This is the Product component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Alert, ScrollView } from 'react-native';
import { View, Col, CardItem, Body, Button } from 'native-base';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
//import Colors from '../Colors';
//import Text from './Text';

export default class product extends Component {
 constructor(props) {
      super(props);
      this.state = {
           items: [],
           name: [],
           image: [],
           price: []
      };
    }



//componentWillMount()
//{
//        AsyncStorage.getItem('token')
//.then((value) => {
//         fetch('https://shiraishi.ksmz.moe/api/products?limit=30',
//         {
//          method: 'get',
//          dataType: 'json',
//          headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//            'Authorization': 'Bearer ' + value
//          }
//         })
//          .then((response) => response.json())
//          .then((responseJson) => {
//            let obj = responseJson;
//            obj.data.map((item, index) => {
 //this.setState({name: JSON.stringify(item.product.name)});
 //this.setState({image: JSON.stringiitem.product.image)});
 //this.setState({price: JSON.stringify(item.product.price)});
 /*this.setState({name: JSON.parse(JSON.stringify(item.product.name))});
 this.setState({image: JSON.parse(JSON.stringify(item.product.image))});
 this.setState({price: JSON.parse(JSON.stringify(item.product.price))});
 console.log(JSON.stringify(item.product));*/

 //Alert.alert(JSON.stringify(item.product.name));
 //Alert.alert(JSON.stringify(this.state.items.price));
 //Alert.alert(JSON.stringify(item.product));
 //});
 //         })
 //         .catch((error) => {
 //           console.error(error);
 //           //Alert.alert("Too many requests!");
 //         });
 //     });

//}

      
      
  render() {
    return(
              <Card style={{width:340, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10}} isDark>
  <CardImage source={{uri: this.props.product.image}}/>
  <CardTitle title={this.props.product.name} subtitle={"$" + (this.props.product.price/100).toFixed(2)} style={{fontSize: 14}}/>
  <CardAction>
    <CardButton
      onPress={() => {this.pressed()}}
      title="VIEW MORE..."
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
}
