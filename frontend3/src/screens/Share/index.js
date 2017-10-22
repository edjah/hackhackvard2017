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
    this.state = {
      buttonVisible: false,
      scanning: true,
      data: null,
    }
  }

  onRead = (t, e) => {
    let accts = JSON.parse(e);
    if (t === "QR_CODE" /* && make sure data contains at least one acct we have */){
      this.setState({buttonVisible: true, scanning: false, data: accts});
    }
  }

  toNext = () => {
    const {navigate} = this.props.navigation;
    let params = { data: this.state.data };
    this.setState({buttonVisible: false, scanning: true, data: null});
    navigate("AddFriend", params);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { state } = this.props.navigation;
    const qr_string = JSON.stringify(state.params);
    return (
      <View style={styles.view}>
          {this.state.scanning &&
            <View style={styles.sc}>
              <Scanner style={styles.cam} onRead={this.onRead} />
            </View>
          }
          {this.state.buttonVisible &&
            <Button title="Done!" onPress={this.toNext} />
          }
          <QRCode value={qr_string} size={300}/>
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
    height: 250,
    width: 250,
  },
})
