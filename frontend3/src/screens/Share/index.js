import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Vibration
} from "react-native"
import PropTypes from "prop-types"
import QRCode from 'react-native-qrcode-svg';
import { Permissions } from 'expo';
import {
  Scanner,
  Button
} from '../../components'
import {
  Divider
} from 'react-native-elements'

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
    Vibration.vibrate(600);
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
    console.log(state.params);
    return (
      <View style={styles.view}>
          {this.state.scanning &&
            <View style={styles.sc}>
              <Scanner style={styles.cam} onRead={this.onRead} />
            </View>
          }
          {this.state.buttonVisible &&
            <Button style={styles.button} title="Done!" onPress={this.toNext} />
          }
          <Divider style={{ backgroundColor: 'blue'}}/>
          <QRCode value={qr_string} size={280}/>
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
    height: 260,
    width: 260,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    height: 100,
    width: 100,
  }
})
