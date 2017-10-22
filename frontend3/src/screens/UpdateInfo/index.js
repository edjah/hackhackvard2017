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
//import TwitterApi from '../../../api.js';
import OAuthManager from 'react-native-oauth';

import PropTypes from "prop-types"

export default class UpdateInfo extends Component {
  static navigationOptions = {
    title: 'Info',
  }

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
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

  _handleRequiredFieldChange = (text, key) => {
    this.setState({requiredFields: {...this.state.requiredFields, [key]: text}});
  }

  _handleOptionalFieldChange = (text, key) => {
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

    // if (name === 'twitter'){
    //     const manager = new OAuthManager('contact');
    //     console.log(manager)
    //     manager.configure({
    //       twitter: {
    //         consumer_key: 'c48R8Xcp37vMZnGI38FPTYJvS',
    //         consumer_secret: 'shixG6oUg5xCYB6LqcDGMdj4yaneiZ1GAZmfK8rbLqHKKnSqNl'
    //       }
    //     });
    //     let x = manager.authorize('twitter')
    //       .then(resp => {
    //         console.log('Your users ID', resp);
    //         return true;
    //       }, e => {
    //         console.log('There was an error', e);
    //         return false;
    //       });
    // }

    this.setState({optionalFields: optionalFieldsCopy, newField: {name: "", value: ""}});
  }

  _done = () => {
    const { navigate } = this.props.navigation;

    try {
      AsyncStorage.setItem("myInfo", JSON.stringify(this.state))
        .then(_ => {
          console.log(JSON.stringify(this.state));
          navigate("SelectInfo");
        });
    } catch (error) {
      alert("We had trouble saving your data. Try again in a second");
    }
  }

  _loadOldData = (state) => {
    newRequiredFields = {...this.state.requiredFields};
    newOptionalFields = {};
    for (let e in state.params) {
      if (state.params.hasOwnProperty(e)) {
        if (e === "name" || e === "number") {
          newRequiredFields[e] = state.params[e];
        } else {
          newOptionalFields[e] = state.params[e];
        }
      }
    }
    this.setState({ requiredFields: newRequiredFields, optionalFields: newOptionalFields, loaded: true });
  }

  componentDidMount = () => {
    const manager = new OAuthManager('contact');
    console.log(manager)
    manager.configure({
      twitter: {
        consumer_key: 'c48R8Xcp37vMZnGI38FPTYJvS',
        consumer_secret: 'shixG6oUg5xCYB6LqcDGMdj4yaneiZ1GAZmfK8rbLqHKKnSqNl'
      }
    });
    manager.authorize('twitter')
      .then(resp => {
        console.log('Your users ID', resp);
      }, e => {
        console.log('There was an error', e);
      });


    const { state } = this.props.navigation;

    if (state.params && !this.state.loaded) {
      this._loadOldData(state);
    }
  }

  render = () => {
    return (
      <ScrollView style={styles.view}>
        <StatusBar hidden={true}/>
        {Object.keys(this.state.requiredFields).map((key, index) => {
          return (
            <View key={index}>
              <FormLabel>{key.toUpperCase()}</FormLabel>
              <FormInput
                onChangeText={(text) => this._handleRequiredFieldChange(text, key)}
                placeholder={`Please enter your ${key}`}
                value={this.state.requiredFields[key]} />
            </View>
          );
        })}
        {Object.keys(this.state.optionalFields).map((key, index) => {
          return (
            <View key={index}>
              <FormLabel>{key.toUpperCase()}</FormLabel>
              <View>
                <FormInput
                  onChangeText={(text) => this._handleOptionalFieldChange(text, key)}
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

