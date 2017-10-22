import { StackNavigator } from 'react-navigation'
import { Platform, StatusBar } from 'react-native';
import UpdateInfo from '../screens/UpdateInfo'
import Share from '../screens/Share'
import AddFriend from '../screens/AddFriend'
import SelectInfo from "../screens/SelectInfo";

export default createRootNavigator = StackNavigator({
    SelectInfo: { screen: SelectInfo,
      navigationOptions:{
        gesturesEnabled:false,
      }
    },
    AddFriend: { screen: AddFriend,
      navigationOptions:{
        gesturesEnabled:false,
      }
    },
    UpdateInfo: { screen: UpdateInfo },
    Share: { screen: Share,
      navigationOptions:{
        gesturesEnabled:false,
      }
    },
},
{
  navigationOptions: {
    gesturesEnabled:false,
  },
  initialRouteName: "SelectInfo",
});
