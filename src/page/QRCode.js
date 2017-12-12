import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet, Linking, Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Camera from 'react-native-camera';

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    onBarCodeRead = (e) => this.setState({qrcode: e.data});

    render () {
        return (
            <View  style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                    >
                                           <Button style={{marginTop:50}} title='Go to link' onPress={ ()=>{ Linking.openURL(this.state.qrcode)}} />
					<Text style={{
                            backgroundColor: 'transparent',
							color: 'red',
							fontSize: 20
                        }}>{this.state.qrcode}</Text>
                        <Button style={{marginTop:0}} title='Go back' onPress={ ()=>{ Actions.pop()}} />
                    </Camera>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});