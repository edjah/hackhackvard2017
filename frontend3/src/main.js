import Expo, { Constants } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import createRootNavigator from './navigations/RootNavigator';

class Main extends Component {

  render() {
    const Layout = createRootNavigator(false);
    return (
      <Layout />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 50
  },
});

Expo.registerRootComponent(Main);
