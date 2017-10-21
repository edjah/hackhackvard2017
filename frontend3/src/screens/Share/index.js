import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button
} from "react-native"
import PropTypes from "prop-types"
import QRCode from 'react-native-qrcode-svg';

export default class Share extends Component {
  static navigationOptions = {
    title: 'Share',
  }

  constructor(props) {
    super(props);
  }

  onRead = (e) => {
    alert(e);
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <Text style={styles.header}>{"Hello World Share"}</Text>
        <QRCode value="hello world" />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: 10,
    padding: 20,
    backgroundColor: "#ababab",
  },
})
