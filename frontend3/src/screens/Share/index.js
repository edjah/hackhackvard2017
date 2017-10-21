import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button
} from "react-native"
import PropTypes from "prop-types"

export default class Share extends Component {
  static navigationOptions = {
    title: 'Info',
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <Text style={styles.header}>{"Hello World Share"}</Text>
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
