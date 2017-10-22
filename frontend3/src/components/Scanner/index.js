import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class Scanner extends React.Component {
  static propTypes = {
    onRead: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onRead: () => (console.log('QR code scanned!')),
  }

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text></Text>;
    } else if (hasCameraPermission === false) {
      return <Text></Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            type={'front'}
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.props.onRead(type, data);
  }
}

