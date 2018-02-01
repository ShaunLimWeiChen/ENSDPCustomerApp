/**
* This is the Product component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, AsyncStorage, Alert } from 'react-native';
import { View, Col, CardItem, Body, Button } from 'native-base';
import { Card } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from './Text';

export default class product extends Component {
 constructor(props) {
      super(props);
      this.state = {
           items: [],
           name: [],
           image: '',
           price: []
      };
    }


componentWillMount()
{
        AsyncStorage.getItem('token')
.then((value) => {
         fetch('https://shiraishi.ksmz.moe/api/products?limit=30',
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
    //  });

}
      
      
  render() {
    return(
        <Card style={{width:325, height: 210, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10}}>
            <CardItem cardBody style={{flex:1}}>
              <Button transparent style={style.button} onPress={() => this.pressed()}>
                <Image source={{uri:this.props.product.image}} style={style.image}/>
                <View style={style.border} />
              </Button>
            </CardItem>
            <CardItem style={{paddingTop: 0}}>
            <Button style={{flex: 1, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0}}
              transparent
              onPress={() => this.pressed()}
            >
                <Body>
                    <Text
                      style={{fontSize: 17}}
                      numberOfLines={1}
                    >{this.props.product.name}</Text>
                    <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                      <View />
                      <Text style={style.price}>PRICE: ${(this.props.product.price/100).toFixed(2)}</Text>
                      <View style={style.line} />
                    </View>
                </Body>
              </Button>
            </CardItem>
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
