import {Login_Success, Logout_success} from '../types';
import * as Storage from '../../service/AsyncStoreConfig';
import AsyncStorage from '@react-native-community/async-storage';

export function Login(Data: any) {
  return async (dispatch: any) => {
    dispatch(loginSuccess(Data));
  };
}

export function Logout() {
  return async (dispatch: any) => {
    AsyncStorage.clear();
    dispatch(setLogoutSuccess());
  };
}

function loginSuccess(data: any) {
  Storage.saveData('UserId', data);

  return {
    type: Login_Success,
    data: data,
  };
}
function setLogoutSuccess() {
  return {
    type: Logout_success,
  };
}
