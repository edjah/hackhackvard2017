import { StackNavigator } from 'react-navigation'
import UpdateInfo from '../screens/UpdateInfo'
import Share from '../screens/Share'
import AddFriend from '../screens/AddFriend'

export default RootNavigator = StackNavigator({
      Share: { screen: Share },
      AddFriend: { screen: AddFriend },
      UpdateInfo: { screen: UpdateInfo },
});
