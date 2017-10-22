import React, { Component } from "react"
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  StatusBar,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Vibration
} from "react-native";
import { FormLabel, FormInput } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { HeaderBackButton } from 'react-navigation';

// import PropTypes from "prop-types"

export default class UpdateInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      requiredFields: {
        name: "",
        number: "",
        facebook: "",
        email: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        snapchat: "",
      },
    };
  }


  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Info',
      headerLeft: <HeaderBackButton onPress={() => params.beforeLeave()} />
    }
  }


  _handleRequiredFieldChange = (text, key) => {
    this.setState({requiredFields: {...this.state.requiredFields, [key]: text}});
  }

  componentWillMount() {
    this.props.navigation.setParams({
      beforeLeave: this._done
    });
    const { state } = this.props.navigation;
    if (state.params && !this.state.loaded) {
      this._loadOldData(state);
    }
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

  getTintStyle = (active) => {
    return active ? {} : {tintColor: "#898989"};
  }

  _loadOldData = (state) => {
    newRequiredFields = {...this.state.requiredFields};
    for (let e in state.params) {
      if (state.params.hasOwnProperty(e)) {
        if (e === "name" || e === "number") {
          newRequiredFields[e] = state.params[e];
        }
      }
    }
    this.setState({ requiredFields: newRequiredFields, loaded: true });
  }

  render = () => {
    const LOGOS = {
      name: require('../../../assets/name.png'),
      number: require('../../../assets/number.png'),
      facebook: require('../../../assets/facebook.png'),
      email: require('../../../assets/email.png'),
      twitter: require('../../../assets/twitter.png'),
      instagram: require('../../../assets/instagram.png'),
      linkedin: require('../../../assets/linkedin.png'),
      snapchat: require('../../../assets/snapchat.png'),
    }

    return (
      <ScrollView style={styles.view}>
        <KeyboardAvoidingView>
        {Object.keys(this.state.requiredFields).map((key, index) => {
          var str = '../../../assets/'+key+'.png';
          return (
            <View key={index} style={styles.listItem}>
              <Image style={[styles.logo, this.getTintStyle(this.state.requiredFields[key] !== "")]} source={LOGOS[key]} />
              <FormInput
                onChangeText={(text) => this._handleRequiredFieldChange(text, key)}
                placeholder={`Please enter your ${key}`}
                value={this.state.requiredFields[key]} />
            </View>
          );
        })}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingTop:10,
    paddingBottom:10,
    width: "100%",
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#E2E1E1',
    flexDirection: 'row',
    justifyContent:'space-between',
  }, 
  logo: {
    width: 30,
    height: 30,
    margin: 10,
  }
});

