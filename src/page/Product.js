/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-material-design'
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import {default as ProductComponent} from '../component/Product';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeSlide: 0,
      quantity: 1,
      selectedColor: '',
      selectedSize: ''
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    this.setState({product: dummyProduct});
  }

  componentDidMount() {
    /* Select the default color and size (first ones) */
    let defColor = this.state.product.colors[0];
    let defSize = this.state.product.sizes[0];
    this.setState({
      selectedColor: defColor,
      selectedSize: defSize
    });
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
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
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title={this.props.product.title} />
        <Content>
           <Image source={{uri: this.props.product.image}} style={style.image}/>
          <View style={{backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center'}}>
            <Grid>
              <Col size={3}>
                <Text style={{fontSize: 18}}>{this.props.product.name}</Text>
              </Col>
              <Col>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>${(this.props.product.price/100).toFixed(2)}</Text>
              </Col>
            </Grid>

            <Grid style={{marginTop:15}}>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Button style={{backgroundColor: Colors.navbarBackgroundColor}} onPress={() => this.setState({quantity: this.state.quantity>1 ? this.state.quantity-1 : 1})} >
                    <Icon name='ios-remove-outline' />
                  </Button>
                  <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30}}>
                    <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                  </View>
                  <Button style={{backgroundColor: Colors.navbarBackgroundColor}} onPress={() => this.setState({quantity: this.state.quantity+1})}>
                    <Icon name='add' />
                  </Button>
                </View>
              </Col>
            </Grid>
            <Grid style={{marginTop: 15}}>
              <Col size={3}>
                <Button block onPress={this.addToCart.bind(this)} style={{backgroundColor: Colors.navbarBackgroundColor}}>
                  <Text style={{color: "#fdfdfd", marginLeft: 5}}>Add to cart</Text>
                </Button>
              </Col>
              <Col>
              <Button block onPress={this.addToWishlist.bind(this)} icon transparent style={{backgroundColor: '#fdfdfd'}}>
                <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-heart' />
              </Button>
              </Col>
            </Grid>
              <Card style={{marginTop: 15, padding: 12, width:350, borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)'}}>
                <Text>
                DESCRIPTION {"\n"} 
                {this.props.product.description}</Text>
              </Card>
              </View>
          <View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>
            <Text style={{marginBottom: 5}}>Other items</Text>
            <View style={{width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10}} />
            {this.renderSimilairs()}
          </View>
        </Content>
      </Container>
    );
  }

  renderImages() {
    let images = [];
    this.state.product.images.map((img, i) => {
      images.push(
          <TouchableWithoutFeedback
            key={i}
            onPress={() => this.openGallery(i)}
          >
            <Image
              source={{uri: img}}
              style={{width: Dimensions.get('window').width, height: 350}}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
      );
    });
    return images;
  }

  renderColors() {
    let colors = [];
    this.state.product.colors.map((color, i) => {
      colors.push(
        <Item key={i} label={color} value={color} />
      );
    });
    return colors;
  }

  renderSize() {
    let size = [];
    this.state.product.sizes.map((s, i) => {
      size.push(
        <Item key={i} label={s} value={s} />
      );
    });
    return size;
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.product.similarItems;
    for(var i=0; i<stateItems.length; i+=2 ) {
      if(stateItems[i+1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent key={stateItems[i+1].id} product={stateItems[i+1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return items;
  }

  openGallery(pos) {
    Actions.imageGallery({images: this.state.product.images, position: pos});
  }

  addToCart() {
    var product = this.props.product;
    //product['color'] = this.state.selectedColor;
    //product['size'] = this.state.selectedSize;
    product['quantity'] = this.state.quantity;
    AsyncStorage.getItem("CART", (err, res) => {
      if(!res) AsyncStorage.setItem("CART",JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART",JSON.stringify(items));
      }
      Toast.show({
        text: 'Product added to your cart!',
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 3000
      });
    });
  }

  addToWishlist() {
    var product = this.props.product;
    var success = true;
    AsyncStorage.getItem("WISHLIST", (err, res) => {
      if(!res) AsyncStorage.setItem("WISHLIST",JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        if(this.search(items, product)) {
          success = false
        }
        else {
          items.push(product);
          AsyncStorage.setItem("WISHLIST",JSON.stringify(items));
        }
      }
      if(success) {
        Toast.show({
          text: 'Product added to your wishlist!',
          position: 'bottom',
          type: 'success',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
      else {
        Toast.show({
          text: 'This product already exist in your wishlist!',
          position: 'bottom',
          type: 'danger',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
    });
  }

  search(array, object) {
    for(var i=0; i<array.length; i++)
      if(JSON.stringify(array[i]) === JSON.stringify(object))
        return true;
    return false;
  }

}

const style = {
  button: {flex: 1, height: 150},
  image: {height: 200, width: 370},
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

const dummyProduct = {
  id: 2,
  title: 'Maggio, Huel and Langosh',
  description: "Pellentesque orci lectus, bibendum iaculis aliquet id, ullamcorper nec ipsum. In laoreet ligula vitae tristique viverra. Suspendisse augue nunc, laoreet in arcu ut, vulputate malesuada justo. Donec porttitor elit justo, sed lobortis nulla interdum et. Sed lobortis sapien ut augue condimentum, eget ullamcorper nibh lobortis. Cras ut bibendum libero. Quisque in nisl nisl. Mauris vestibulum leo nec pellentesque sollicitudin. Pellentesque lacus eros, venenatis in iaculis nec, luctus at eros. Phasellus id gravida magna. Maecenas fringilla auctor diam consectetur placerat. Suspendisse non convallis ligula. Aenean sagittis eu erat quis efficitur. Maecenas volutpat erat ac varius bibendum. Ut tincidunt, sem id tristique commodo, nunc diam suscipit lectus, vel",
  image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
  images: [
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
  ],
  price: '$100',
  colors: ['Red', 'Blue', 'Black'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: 'MAN',
  similarItems: [{
              "id": 1,
                "name": "Schroeder-Willms",
                "description": "Sit sint aut blanditiis facere cum praesentium itaque commodi. Consequatur tenetur tenetur consequuntur. Porro debitis aut natus delectus pariatur dignissimos beatae.",
                "price": 32004,
                "image": "https://picsum.photos/400?image=390"
            },
            {
                                "id": 2,
                "name": "Langworth, Abernathy and Casper",
                "description": "Aut hic neque iure. Sunt placeat aut quidem nemo velit ut repellat. Quis incidunt in omnis sunt.",
                "price": 10964,
                "image": "https://picsum.photos/400?image=0"

            },
            {
                               "id": 3,
                "name": "Buckridge-Konopelski",
                "description": "Modi eum vel eos quibusdam ad tempore. Fugit quia sapiente quo perspiciatis tempora. Enim deserunt numquam temporibus exercitationem cum hic. Voluptatem debitis sint ea soluta fuga aperiam.",
                "price": 36205,
                "image": "https://picsum.photos/400?image=241"

            },
            {
              "id": 4,
                "name": "Wisozk-Denesik",
                "description": "Odit voluptates enim eligendi ratione dicta possimus. Unde quidem rerum voluptatibus ad aut. Atque molestias non aut ea saepe sit.",
                "price": 29770,
                "image": "https://picsum.photos/400?image=329"

            },
            {
                               "id": 5,
                "name": "Predovic-Skiles",
                "description": "A impedit voluptas minima qui explicabo. Aut dolor eos fugit aspernatur unde dolorem quia. Ducimus corrupti minima cum natus nulla et itaque. Ut minima vel quod nisi.",
                "price": 67144,
                "image": "https://picsum.photos/400?image=287"

            },
            {
                              "id": 6,
                "name": "Hoppe-Trantow",
                "description": "Quia et laudantium quia ratione. Voluptas numquam ex et voluptatem quos. Aut libero quia in a dolorem. Sit culpa hic id in.",
                "price": 68983,
                "image": "https://picsum.photos/400?image=366"

            },
            {
                              "id": 7,
                "name": "Swift Inc",
                "description": "Dolores saepe laboriosam aspernatur atque numquam iste. Pariatur amet assumenda expedita quae. Eius qui ratione quod corrupti. Ut similique facilis soluta qui qui. Molestiae iure cumque sit non.",
                "price": 91624,
                "image": "https://picsum.photos/400?image=159"

            },
            {
                                "id": 8,
                "name": "Stark-Feil",
                "description": "A aut fugit porro quas. Nesciunt quod earum quae a placeat quidem voluptatem. Voluptate quaerat alias rerum enim excepturi. Quae non voluptatem ipsam enim aliquid exercitationem.",
                "price": 65892,
                "image": "https://picsum.photos/400?image=107"

            },
            {
                               "id": 9,
                "name": "Sipes, Skiles and Nitzsche",
                "description": "Dolores libero tenetur similique qui aliquid et dolores dolorem. Voluptas perferendis ipsa sapiente sapiente numquam minus. Rerum et laborum doloremque ab nostrum.",
                "price": 33567,
                "image": "https://picsum.photos/400?image=233"

            },
            {
                               "id": 10,
                "name": "Boyle, Breitenberg and Windler",
                "description": "Hic dolor eligendi odio qui velit quasi dolor debitis. Dolores delectus cum delectus voluptatem a explicabo. Exercitationem voluptatem ea et recusandae dicta modi necessitatibus. Quibusdam veritatis nihil sed vitae in vel autem saepe.",
                "price": 94803,
                "image": "https://picsum.photos/400?image=390"

            },
            {
                               "id": 11,
                "name": "Keebler-Aufderhar",
                "description": "Tempora ducimus reiciendis alias. Sit aut blanditiis odit est. Et incidunt facilis consequuntur velit laudantium. Non facilis aut atque occaecati beatae.",
                "price": 80098,
                "image": "https://picsum.photos/400?image=289"

            },
            {
               "id": 12,
                "name": "Labadie Group",
                "description": "Neque minima impedit ut voluptatibus odit enim commodi. Modi omnis rerum quae autem asperiores. Sint est est a blanditiis.",
                "price": 70715,
                "image": "https://picsum.photos/400?image=210"

            },
            {
                 "id": 13,
                "name": "Raynor, Abbott and Reynolds",
                "description": "Ipsa similique perspiciatis vel qui consequatur nostrum quis quaerat. Molestias quaerat vitae velit culpa sit nihil rerum porro. Rerum accusamus similique eos odio id et.",
                "price": 3033,
                "image": "https://picsum.photos/400?image=385"

            },
            {
                              "id": 14,
                "name": "Satterfield, Conroy and Hilll",
                "description": "Iusto dolores assumenda et est sint sint. Aliquid eum deleniti quidem ad. Quas nemo voluptas tenetur alias fugit modi. Sed fugit est eligendi ea doloribus culpa dolorum. Accusantium nemo deleniti provident aut velit voluptatibus soluta aperiam.",
                "price": 33228,
                "image": "https://picsum.photos/400?image=224"

            },
            {
                              "id": 15,
                "name": "Champlin-White",
                "description": "Dolorem est et vel dolorem incidunt qui veritatis. Qui suscipit debitis suscipit sunt ut in. Quia sit qui ad qui aut cupiditate.",
                "price": 32962,
                "image": "https://picsum.photos/400?image=283"

            },
            {
                               "id": 16,
                "name": "Shanahan-Carroll",
                "description": "Placeat eos odio necessitatibus asperiores. Repellendus dolorem dolor rerum eum et.",
                "price": 23896,
                "image": "https://picsum.photos/400?image=227"

            },
            {
                              "id": 17,
                "name": "Pouros Inc",
                "description": "Nesciunt voluptates ad nemo omnis esse dolore tenetur. Amet dolorem et non placeat odit ea est. Quis non ad molestiae quam aut voluptates odit.",
                "price": 50120,
                "image": "https://picsum.photos/400?image=109"

            },
            {
                               "id": 18,
                "name": "Wuckert PLC",
                "description": "Ullam dolores veniam molestiae ut deleniti voluptatem quo voluptate. Et ab quis sit et sint aliquid qui. In hic nam voluptas alias aliquam quibusdam nam.",
                "price": 14258,
                "image": "https://picsum.photos/400?image=222"

            },
            {
                              "id": 19,
                "name": "Mraz, Altenwerth and Hessel",
                "description": "Quam laborum blanditiis voluptas quas aut perspiciatis explicabo. Necessitatibus doloribus laboriosam distinctio neque recusandae velit officiis. Ad sunt aut omnis inventore nemo est omnis excepturi.",
                "price": 27308,
                "image": "https://picsum.photos/400?image=342"

            },
            {
                              "id": 20,
                "name": "Sauer, Turner and Abshire",
                "description": "Ullam ut similique amet nostrum molestiae temporibus. Occaecati tempore ut laborum earum. Inventore natus non rerum ea facere.",
                "price": 51574,
                "image": "https://picsum.photos/400?image=51"

            },
            {
                                    "id": 21,
                "name": "Ebert Inc",
                "description": "Pariatur sed accusantium voluptatem maiores aliquid. Autem excepturi incidunt modi adipisci asperiores.",
                "price": 90112,
                "image": "https://picsum.photos/400?image=320"

            },
            {
                               "id": 22,
                "name": "Ferry, Koch and Crist",
                "description": "Ut quia facere aut nam. Sed repellendus sed voluptas optio. Itaque debitis possimus reiciendis error aut. Et quo illum sed nam quas vero aliquam expedita. Dolorem rerum officiis est cupiditate.",
                "price": 30505,
                "image": "https://picsum.photos/400?image=62"

            },
            {
                              "id": 23,
                "name": "Funk-Koelpin",
                "description": "Quisquam et omnis debitis et. Rem nihil rem omnis velit enim ducimus et. Exercitationem rerum id officia eveniet veniam aut veniam. A voluptatibus sint unde odit quia.",
                "price": 96168,
                "image": "https://picsum.photos/400?image=227"

            },
            {
               "id": 24,
                "name": "Will, Pacocha and Schiller",
                "description": "Eum officia ut inventore quae. Odio deleniti ut officiis id. Et debitis quam reprehenderit animi ratione facere consequatur.",
                "price": 5110,
                "image": "https://picsum.photos/400?image=156"

            },
            {
                               "id": 25,
                "name": "Kihn and Sons",
                "description": "Minus et et architecto. Commodi sed consectetur eum at fuga ducimus. Accusamus reprehenderit tenetur sint. Quasi aut ea ut repudiandae ab delectus porro.",
                "price": 28159,
                "image": "https://picsum.photos/400?image=90"

            },
            {
                                "id": 26,
                "name": "Buckridge Ltd",
                "description": "Velit animi aut omnis minima voluptas voluptatibus. Impedit deserunt commodi in tempora autem ad ut. Adipisci id ab quia quibusdam enim qui quo. Asperiores mollitia voluptatem atque quibusdam ex.",
                "price": 16825,
                "image": "https://picsum.photos/400?image=310"

            },
            {
                               "id": 27,
                "name": "Bosco and Sons",
                "description": "Eum est molestias reprehenderit voluptatum. Eius nihil aut rerum et distinctio qui.",
                "price": 82724,
                "image": "https://picsum.photos/400?image=99"

            },
            {
                "id": 28,
                "name": "Fisher, Upton and Wehner",
                "description": "Ea odio dolor excepturi optio maiores. Neque magni omnis iusto deserunt quae architecto beatae temporibus. Praesentium ab ducimus qui eos et est. Quia alias eius iste quis.",
                "price": 19108,
                "image": "https://picsum.photos/400?image=36"

            },
            {
                               "id": 29,
                "name": "D'Amore, Steuber and Crooks",
                "description": "Facilis ut non ea. Dolore ipsam autem doloribus quo dolore. Eligendi non maiores eveniet provident repellat quia quas.",
                "price": 3197,
                "image": "https://picsum.photos/400?image=383"

            },
            {
                            "id": 30,
                "name": "Hessel, Gutkowski and Mayert",
                "description": "Eius modi aut exercitationem ullam corrupti atque in. Possimus assumenda quos facilis molestiae rerum ut omnis assumenda. Et iusto iusto non esse qui corporis impedit.",
                "price": 40460,
                "image": "https://picsum.photos/400?image=60"

            }
      ]
};
