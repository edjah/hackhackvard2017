import { StackNavigator } from 'react-navigation'
import UpdateInfo from '../screens/UpdateInfo'
import Share from '../screens/Share'

export default createRootNavigator = (inputInfo) => {
  return StackNavigator(
    {
      UpdateInfo: { screen: UpdateInfo },
      Share: { screen: Share },
    },
    {
      mode: "modal",
      initialRouteName: inputInfo ? "UpdateInfo" : "Share"
    }
  );
}
