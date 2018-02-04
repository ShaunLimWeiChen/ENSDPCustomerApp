/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Home from './page/Home';
import Search from './page/Search';
import Cart from './page/Cart';
import WishList from './page/WishList';
import Map from './page/Map';
import Messages from './page/Messages';
import Contact from './page/Contact';
import Category from './page/Category';
import Product from './page/Product';
import ImageGallery from './page/ImageGallery';
import Login from './page/Login';
import Signup from './page/Signup';
import Checkout from './page/Checkout';
import BarcodeScan from './page/QRCode';
import Logout from './page/Logout';
import SignupWeb from './page/SignupWebPage';
import ChangeDetails from'./page/ChangeDetails';
import ChangePassword from './page/ChangePassword';
import ProfileDetails from './page/ProfileDetails';
import TransactionHistory from './component/TransactionHistory';
import Chats from './page/Chats';
import QRGenerator from './page/QRGenerator';
import Confirmation from './page/Confirmation';
import CheckoutChoice from './page/CheckoutChoice';

export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="search" component={Search} modal hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene key="wishlist" component={WishList} modal hideNavBar />
            <Scene key="map" component={Map} modal hideNavBar />
            <Scene key="contact" component={Contact} modal hideNavBar />
            <Scene key="messages" component={Messages} modal hideNavBar />
            <Scene key="category" component={Category} hideNavBar />
            <Scene key="product" component={Product} hideNavBar />
            <Scene key="imageGallery" component={ImageGallery} modal hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="signup" component={Signup} hideNavBar />
            <Scene key="checkout" component={Checkout} hideNavBar />
            <Scene key="transactionhistory" component={TransactionHistory} hideNavBar />
      			<Scene key="qrcode" component={BarcodeScan} hideNavBar />
            <Scene key= "logout" component={Logout} hideNavBar />
            <Scene key= "signupwebpage" component={SignupWeb} hideNavBar />
            <Scene key= "changedetails" component={ChangeDetails} hideNavBar />
           <Scene key= "changepassword" component={ChangePassword} hideNavBar />
           <Scene key="profiledetails" component={ProfileDetails} hideNavBar />
           <Scene key="conversations" component={Chats} hideNavBar />
           <Scene key="qrgenerator" component={QRGenerator} hideNavBar />
           <Scene key="confirmation" component={Confirmation} hideNavBar />
           <Scene key="checkoutchoice" component={CheckoutChoice} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
