/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableHighlight, AsyncStorage, Picker } from 'react-native';
import { Container, Content, View, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import PopupDialog, {DialogTitle, slideAnimation} from 'react-native-popup-dialog';
import dismissKeyboard from 'react-native-dismiss-keyboard';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Checkout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        total: 0,
        card: true,
        paypal: false,
        name: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        city: '',
        postcode: '',
        note: ''
      };
  }

  componentWillMount() {
    this.setState({cartItems: this.props.cartItems});
    this.props.cartItems.map((item) => {
      var total = 0;
      total += parseFloat(item.price) * parseInt(item.quantity);
      this.setState({total: total});
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
      </Right>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="CHECKOUT" />
        <Content padder>
          <TouchableHighlight onPress={() => Actions.login()}>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>
                <Icon name="ios-warning" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>
                <Text style={{color: '#fdfdfd'}}>Returning customer? Click here to login</Text>
            </View>
          </TouchableHighlight>
          <View>
            <Text style={{marginTop: 15, fontSize: 18}}>Shipping information</Text>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Name' onChangeText={(text) => this.setState({name: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Phone' onChangeText={(text) => this.setState({phone: text})} placeholderTextColor="#687373" />
            </Item>
             <Picker
  selectedValue={this.state.country}
  onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
  <Picker.Item label="Singapore" value="Singapore" />
  <Picker.Item label="Malaysia" value="Malaysia" />
    <Picker.Item label="Indonesia" value="Indonesia" />
      <Picker.Item label="Vietnam" value="Vietnam" />
        <Picker.Item label="Thailand" value="Thailand" />
          <Picker.Item label="China" value="China" />
            <Picker.Item label="United Kingdom" value="United Kingdom" />
              <Picker.Item label="United States" value="United States" />
                <Picker.Item label="Japan" value="Japan" />
                  <Picker.Item label="Germany" value="Germany" />
                    <Picker.Item label="France" value="France" />
                      <Picker.Item label="Italy" value="Italy" />
</Picker>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Address' onChangeText={(text) => this.setState({address: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='City' onChangeText={(text) => this.setState({city: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Postcode' onChangeText={(text) => this.setState({postcode: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Note' onChangeText={(text) => this.setState({note: text})} placeholderTextColor="#687373" />
            </Item>
          </View>
          <Text style={{marginTop: 15, fontSize: 18}}>Your order</Text>
          <View style={styles.invoice}>
            <List>
                {this.renderItems()}
            </List>
            <View style={styles.line} />
            <Grid style={{paddingLeft: 10, paddingRight: 10, marginTop: 7}}>
              <Col>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>Total</Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'right', fontSize: 18, fontWeight: 'bold'}}>${this.state.total/100}</Text>
              </Col>
            </Grid>
          </View>
          <View>
            <Text style={{marginTop: 15, marginBottom: 7, fontSize: 18}}>Payment method</Text>
            <ListItem style={{borderWidth: 1, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0}}>
              <Text>Pay with card</Text>
              <FAIcon name="cc-mastercard" size={20} color="#c0392b" style={{marginLeft: 7}} />
              <FAIcon name="cc-visa" size={20} color="#2980b9" style={{marginLeft: 2}} />
              <Right>
                <Radio selected={this.state.card} onPress={() => this.setState({card: true, paypal: false})} />
              </Right>
            </ListItem>
            <ListItem style={{borderWidth: 1, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0, borderTopWidth: 0}}>
              <Text>Pay with Paypal</Text>
              <FAIcon name="cc-paypal" size={20} color="#34495e" style={{marginLeft: 7}} />
              <Right>
                <Radio selected={this.state.paypal} onPress={() => this.setState({card: false, paypal: true})} />
              </Right>
            </ListItem>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
           <Button onPress={() => this.check()} style={{backgroundColor: Colors.navbarBackgroundColor}} block iconLeft>
              <Icon name='ios-card' />
              <Text style={{color: '#fdfdfd'}}>Check your details</Text>
            </Button>
            <Text>
{"\n"}
</Text>
            <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.navbarBackgroundColor}} block iconLeft>
              <Icon name='ios-card' />
              <Text style={{color: '#fdfdfd'}}>Proceed to payment</Text>
            </Button>
          </View>
        </Content>
        <PopupDialog
    dialogTitle={<DialogTitle title="Your Details" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
     dialogAnimation={slideAnimation}
  >
    <View>
      <Text>Your name: {this.state.name}</Text>
      <Text>Your email: {this.state.email}</Text>
      <Text>Your phone number: {this.state.phone}</Text>
      <Text>Your country: {this.state.country}</Text>
      <Text>Your address: {this.state.address}</Text>
      <Text>Your city: {this.state.city}</Text>
      <Text>Additional notes: {this.state.note}</Text>
    </View>
  </PopupDialog>
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          style={{marginLeft: 0}}
        >
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 15}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.name}
            </Text>
            
          </Body>
          <Right>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>${item.price/100}</Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  check() {
        AsyncStorage.setItem('name', this.state.name);
    AsyncStorage.setItem('email', this.state.email);
    AsyncStorage.setItem('phone', this.state.phone);
    AsyncStorage.setItem('country', this.state.country);
    AsyncStorage.setItem('address', this.state.address);
    AsyncStorage.setItem('city', this.state.postcode);
    AsyncStorage.setItem('note', this.state.note);
    AsyncStorage.setItem('total', this.state.total);
    this.popupDialog.show();
    dismissKeyboard();
  }

  checkout() {
    console.log(this.state);
    Actions.checkoutchoice();
  }

}

const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 10
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#bdc3c7'
  }
};
