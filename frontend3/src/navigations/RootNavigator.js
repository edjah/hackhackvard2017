import { StackNavigator } from 'react-navigation'
import UpdateInfo from '../screens/UpdateInfo'
import Share from '../screens/Share'
import SelectInfo from "../screens/SelectInfo";

export default createRootNavigator = StackNavigator({
  SelectInfo: { screen: SelectInfo },
  UpdateInfo: { screen: UpdateInfo },
  Share: { screen: Share },
});
