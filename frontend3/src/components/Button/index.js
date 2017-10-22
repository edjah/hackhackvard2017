import React, { Component } from 'react'
import { 
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.any
  }

  static defaultProps = {
    title: 'Click Me!',
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
      >
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderColor: '#4475c4',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4475c4',
  },
});

