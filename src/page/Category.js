/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Button, Icon, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, Alert } from 'react-native';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';
import Home from './Home';

export default class Category extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: []
      };
  }
    
    /*
   componentWillMount() {
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
            let obj = responseJson;
            obj.data.map((item, index) => {
  this.setState({name: item.product.name});
  this.setState({image: item.product.image});
  this.setState({price: item.product.price});
});
          })
          .catch((error) => {
            console.error(error);
          });
        });
      }
      */
      componentWillMount() {
     var products = require('./datatest/product.json');
    this.setState({items: products});
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu-outline' />
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
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container style={{backgroundColor: '#fdfdfd'}}>
            <Navbar left={left} right={right} title={this.props.title} />
            <Content padder>
              {this.renderProducts()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderProducts() {
    let items = [];
    let stateItems = this.state.items
    for(var i=0; i<stateItems.length; i+=2 ) {
      if(stateItems[i+1]) {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Product key={stateItems[i+1].id} product={stateItems[i+1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return items;
  }
}
