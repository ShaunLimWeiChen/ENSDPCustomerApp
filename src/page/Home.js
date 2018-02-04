/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Stylesheet } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';
import {default as ProductComponent} from '../component/Product';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
           items: [],
           name: [],
           image: '',
           price: [],
      position: 1,
      interval: null,
     dataSource: [
       {
                "title": "POPULAR: Rempel-Stracke",
                "caption": "PRICE: $" + (35658/100).toFixed(2),
                "url": "https://picsum.photos/400?image=375"
            },
            {
                "title": "HOT: Sawayn Inc",
                "caption": "PRICE: $" + (39037/100).toFixed(2),
                "url": "https://picsum.photos/400?image=373"
            },
            {
                "title": "NEWEST: Sawayn, Grady and Mayert",
                "caption": "PRICE: $" + (54561/100).toFixed(2),
                "url": "https://picsum.photos/400?image=123"
            },
            {
                "title": "ALL TIME: Tillman, Keebler and Bode",
                "caption": "PRICE: $" + (1458/100).toFixed(2),
                "url": "https://picsum.photos/400?image=44"
            },
            {
                "title": "VALUE FOR MONEY: Hoeger, Bahringer and Toy",
                "caption": "PRICE: $" + (47034/100).toFixed(2),
                "url": "https://picsum.photos/400?image=386"
            },
      ],
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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
          <Container>
            <Navbar left={left} right={right} title="PRODUCTS" />
            <Content>
                              <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        arrowSize={1}
        onPositionChanged={position => this.setState({ position })} />
              {this.renderCategories()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories() {
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} />
      );
    }
    return cat;
  }

}

var categories = [
  {
    id: 1,
    title: 'ELECTRONICS',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arduino_ftdi_chip-1.jpg/1200px-Arduino_ftdi_chip-1.jpg'
  },
  {
    id: 2,
    title: 'GENERAL',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'
  },
  {
    id: 3,
    title: 'ACCESSORIES',
    image: 'http://inspomag.com/wp-content/uploads/2016/05/Fashion-Accessories-1.jpg'
  },
  {
    id: 4,
    title: 'HARDWARE',
    image: 'http://collate.co.uk/wp-content/uploads/2015/11/it-hardware.jpg'
  }
];
