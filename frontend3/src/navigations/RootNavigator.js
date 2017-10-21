import { StackNavigator } from 'react-navigation'
import UpdateInfo from '../screens/UpdateInfo'
import Share from '../screens/Share'
import AddFriend from '../screens/AddFriend'
import SelectInfo from "../screens/SelectInfo";

export default createRootNavigator = StackNavigator({
    SelectInfo: { screen: SelectInfo },
    AddFriend: { screen: AddFriend },
    UpdateInfo: { screen: UpdateInfo },
    Share: { screen: Share },
});
