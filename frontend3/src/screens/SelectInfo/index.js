import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Text, FormLabel, FormInput, CheckBox } from 'react-native-elements';
import Button from '../../components/Button';

import PropTypes from 'prop-types'

export default class SelectInfo extends Component {
  static navigationOptions = {
    title: "Contact",
    headerLeft: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      fields: null,
      selected: new Set(['name', 'number'])
    };
  }

  _goToUpdate = () => {
    const { navigate } = this.props.navigation;

    navigate('UpdateInfo');
  }

  _isSelected = key => {
    return this.state.selected.has(key);
  }

  _handleCheckBoxPress = key => {
    let newSet = new Set(this.state.selected.values());

    if (this._isSelected(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }

    this.setState({ selected: newSet });
  }

  _goToSharing = () => {
    const { navigate } = this.props.navigation;

    let ret = {};
    this.state.selected.forEach(val => {
      ret[val] = this.state.fields[val];
    });

    navigate('Share', ret);
  }

  _goToUpdate = () => {
    const { navigate } = this.props.navigation;

    navigate('UpdateInfo', this.state.fields);
  }

  _delete = () => {
    this.setState({ fields: null, selected: new Set(['name', 'number']), loaded: false });
    AsyncStorage.removeItem('myInfo');
  }

  render = () => {
    if (!this.state.loaded) {
      try {
        AsyncStorage.getItem('myInfo')
          .then(info => {
            if (info !== null) {
              info = JSON.parse(info);
              let ret = {};

              for (let key in info.requiredFields) {
                if (info.requiredFields.hasOwnProperty(key) && info.requiredFields[key] !== '') {
                  ret[key] = info.requiredFields[key];
                }
              }

              for (let key in info.optionalFields) {
                if (info.optionalFields.hasOwnProperty(key) && info.optionalFields[key] !== '') {
                  ret[key] = info.optionalFields[key];
                }
              }

              if (Object.keys(ret).length > 0) {
                this.setState({ fields: ret});
              } 
            }
            this.setState({ loaded: true });
          });
      } catch (error) {
        alert('We were unable to fetch your data! Tap the button to try again.');
      }
    }

    let contents = <ActivityIndicator />;
    if (this.state.loaded) {
      if (!this.state.fields) {
        contents = (
          <View style={styles.container}>
            <Text h2>It looks like you haven't filled in your information yet! Click the button below to get started.</Text>
            <Button style={styles.button} title="Register" backgroundColor="#397af8" onPress={this._goToUpdate} />
          </View>
        );
      } else {
        contents = (
          <View style={styles.container}>
            <Text h1>{this.state.fields.name}</Text>
            <View style={styles.topView}>
              {Object.keys(this.state.fields).map((key, index) => {
                if (key === "name") {
                  return null;
                }
                return (
                  <CheckBox
                    style={styles.checks}
                    key={index}
                    checked={this._isSelected(key)}
                    onPress={() => this._handleCheckBoxPress(key)}
                    title={`${key.toUpperCase()}: ${this.state.fields[key]}`} />
                );
              })}
            </View>
            <View style={styles.bottomView}>
              <Button style={styles.button} title="SHARE" onPress={this._goToSharing} />
              <Button style={styles.button} title="EDIT" onPress={this._goToUpdate} />
            </View>
          </View>
        );
      }
    }

    return (
      <ScrollView contentContainerStyle={styles.sv}>
        <StatusBar hidden={true} />
        {contents}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sv: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1
  },
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    width:'100%',
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:'100%',
    width:'100%',
  },
  button: {
    borderRadius: 30,
    height: 40,
    width: 200,
  },
  checks: {
    margin: 7,
    width: '100%',
  }
});
