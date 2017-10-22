import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Linking
} from 'react-native'
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types'
import QRCode from 'react-native-qrcode-svg';
import { Permissions } from 'expo';
import {
  Scanner
} from '../../components'

import Contacts from 'react-native-contacts'


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
    const media = {
      facebook: x => 'https://www.facebook.com/' + x,
      twitter: x => 'https://twitter.com/intent/follow?screen_name=' + x,
      instagram: x => 'https://www.instagram.com/' + x,
      snapchat: x => 'https://www.snapchat.com/add/' + x,
      linkedin: x => 'https://www.linkedin.com/in/' + x,
    }

    let newContact = {
      givenName: shared_media['name'].split(' ')[0],
      familyName: shared_media['name'].split(' ').slice(1).join(' '),
      emailAddresses: [{
        label: 'work',
        email: shared_media['email']
      }],
      phoneNumbers: [{
        label: 'mobile',
        number: shared_media['phone']
      }]
    }

    const accts = Object.entries(shared_media).filter(x => x[0] in media);
    let social_media = [];


    for (let i = 0, j = 0; i < accts.length; i++) {
      if (accts[i][0] in media) {
        social_media.push(

        );
      }
    }

    return (
      <View style={styles.view}>
        <Text h1 style={{color: 'blue'}}
          onPress={() => Contacts.addContact(newContact, err => console.log)}>
          {shared_media['name']}
        </Text>
        {accts.map((x, i) => {
          return (
            <Text key={i} style={{color: 'blue'}}
              onPress={() => Linking.openURL(media[x[0]](x[1])) }>
              {x[0]}
            </Text>
          );
        })}
        <Button title='New Contact!' onPress={this.newContact} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection:'column',
    alignItems:'center',
  },
  sc: {
    alignContent:'center',
    height: 1,
    width: 1,
    backgroundColor: '#00f',
  },
})
