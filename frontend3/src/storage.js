import { AsyncStorage } from "react-native";

export const ACCOUNTS = "media-accounts";


export const removeAccount = (id) => 
  AsyncStorage.removeItem(USER_KEY);

export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(ACCOUNTS)
      .then(res => resolve(JSON.parse(res));)
      .catch(err => reject(err));
  });
};

export const onAddAccount = (account) => {
  let accts = getAccounts();
  AsyncStorage.setItem(ACCOUNTS, JSON.stringify);
};
