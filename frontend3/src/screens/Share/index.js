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
import { Permissions } from 'expo';
import {
  Scanner
} from '../../components'

export default class Share extends Component {
  static navigationOptions = {
    title: 'Share',
  }

  constructor(props) {
    super(props);
  }

  onRead = (e) => {
    console.log(e);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    return (
      <View style={styles.view}>
          <View style={styles.sc}>
            <Scanner style={styles.cam} onRead={this.onRead} />
          </View>
          <QRCode value="hello world" size={300}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
  },
  sc: {
    alignContent:"center",
    height: 100,
    width: 100,
    backgroundColor: "#00f",
  },
})
