/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


import { readTag, writeTag } from 'nfc-react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<{}> {
  handleClick() {
    readTag([{ sector: 5, bloques: [1,2], clave: 'FFFFFFFFFFFF', tipoClave: 'A' },
        { sector: 6, bloques: [0,1,2], clave: 'FFFFFFFFFFFF', tipoClave: 'A' },
        { sector: 4, bloques: [0], clave: 'FFFFFFFFFFFF', tipoClave: 'A' }])
      .then((card) => {
        console.log(card)
        // returns Object {lectura: Array[3], card: "A3F813DB"}
      }).catch((err) => {
        console.log(err.message)
      });
  }

  render() {
    alert("Hello");

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title={"hello"} onPress={e => this.handleClick(e)}>Testing</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
