import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Linking
} from 'react-native'
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types'
import QRCode from 'react-native-qrcode-svg';
import { Permissions } from 'expo';
import {
  Scanner
} from '../../components'
import Button from '../../components/Button';

import Contacts from 'react-native-contacts'


export default class AddFriend extends Component {
  static navigationOptions = {
    title: 'Shared Accounts',
    headerLeft: null,
  }

  constructor(props) {
    super(props);
  }

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate('SelectInfo');
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
    /*
    let vCard = vCard();
    vCard.firstName = shared_media['name'].split(' ')[0];
    vCard.lastName = shared_media['name'].split(' ').slice(1).join(' ');
    vCard.email = shared_media['email'];
    vCard.cellPhone = shared_media['phone'];
    */

    const accts = Object.entries(shared_media).filter(x => x[0] in media);

    return (
      <View style={styles.view}>
        <Button style={styles.name} onPress={() => {}/*Contacts.addContact(newContact, err => console.log)*/} title={shared_media['name']} />
        {accts.map((x, i) => {
          return (
            <View key={i} style={styles.acct}>
              <Text style={styles.result}>
                {x[0]+": "+x[1]}
              </Text>
              <Button style={styles.plus} title="+" onPress={() => Linking.openURL(media[x[0]](x[1])) }/>
            </View>
          );
        })}
        <Button style={styles.back} title='Return' onPress={this.goBack} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
    flexDirection:'column',
    alignItems:'center',
  },
  name: {
    backgroundColor: '#EFEFEF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  acct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 10,
    borderColor: '#E2E1E1',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  plus: {
    borderRadius: 10,
    height: 40,
    width: 40,
  },
  back: {
    borderRadius: 30,
    height: 35,
    width: 300,
    marginTop: 20,
  }
})
