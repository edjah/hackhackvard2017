import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Linking
} from "react-native"
import PropTypes from "prop-types"
import QRCode from 'react-native-qrcode-svg';
import { Permissions } from 'expo';
import {
  Scanner
} from '../../components'

export default class AddFriend extends Component {
  static navigationOptions = {
    title: 'Shared Accounts',
  }

  constructor(props) {
    super(props);
  }

  newContact = () => {
    const { navigate } = this.props.navigation;
    // navigate(/*old page*/)
  }

  render() {
    const { state } = this.props.navigation;
    const shared_media = state.params.data;
    const accts = Object.entries(shared_media);
    console.log(accts);
    return (
      <View style={styles.view}>
        <View>
          {accts.map((acct, i) => <Text key={i}>{acct[0]+": "+acct[1]}</Text>)}
        </View>
        <Button title="New Contact!" onPress={this.newContact} />
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
    alignItems:"center",
  },
  sc: {
    alignContent:"center",
    height: 1,
    width: 1,
    backgroundColor: "#00f",
  },
})
