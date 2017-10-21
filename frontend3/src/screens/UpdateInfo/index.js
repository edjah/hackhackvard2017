import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  StatusBar,
  AsyncStorage
} from "react-native";
import { FormLabel, FormInput } from 'react-native-elements';

import PropTypes from "prop-types"

export default class UpdateInfo extends Component {
  static navigationOptions = {
    title: 'Info',
  }

  constructor(props) {
    super(props);

    this.state = {
      requiredFields: {
        name: "",
        number: ""
      },
      optionalFields: {
        email: "",
        facebook: ""
      },
      newField: {
        name: "",
        value: ""
      }
    };
  }

  _handleFieldChange = (text, key) => {
    this.setState({optionalFields: {...this.state.optionalFields, [key]: text}});
  }

  _deleteField = key => {
    optionalFieldsCopy = {...this.state.optionalFields};

    delete optionalFieldsCopy[key];
    this.setState({optionalFields: optionalFieldsCopy});
  }

  _addNewField = (name, value) => {
    if (name === "") {
      return;
    }

    optionalFieldsCopy = {...this.state.optionalFields};

    optionalFieldsCopy[name.toLowerCase()] = value;

    this.setState({optionalFields: optionalFieldsCopy, newField: {name: "", value: ""}});
  }

  _done = () => {

  }

  render = () => {
    return (
      <ScrollView style={styles.view}>
        <StatusBar hidden={true}/>
        {Object.keys(this.state.requiredFields).map((key, index) => {
          return (
            <View key={index}>
              <FormLabel>{key.toUpperCase()}</FormLabel>
              <FormInput placeholder={`Please enter your ${key}`} />
            </View>
          );
        })}
        {Object.keys(this.state.optionalFields).map((key, index) => {
          return (
            <View key={index}>
              <FormLabel>{key.toUpperCase()}</FormLabel>
              <View>
                <FormInput
                  onChangeText={(text) => this._handleFieldChange(text, key)}
                  placeholder={`(Optional) Please enter your ${key}`}
                  value={this.state.optionalFields[key]} />
                <Button title="X" onPress={() => this._deleteField(key)} />
              </View>
            </View>
          );
        })}
        <FormLabel>NEW FIELD</FormLabel>
        <FormInput
          onChangeText={(text) => this.setState({newField: {...this.state.newField, name: text}})}
          placeholder="Name of new field"
          value={this.state.newField.name} />
        <FormInput
          onChangeText={(text) => this.setState({newField: {...this.state.newField, value: text}})}
          placeholder="Value"
          value={this.state.newField.value} />
        <Button
          onPress={() => this._addNewField(this.state.newField.name, this.state.newField.value)}
          title="Add new field" />
        <View style={{height: 10}} />
        <Button onPress={this._done} title="Done!"/>
        <View style={{height: 10}} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff"
  }
});

