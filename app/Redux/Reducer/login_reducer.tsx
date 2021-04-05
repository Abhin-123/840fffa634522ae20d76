import React from 'react';
import {
  Get_Login,
  Login_Success,
  Login_Failure,
  Restore_email,
  Logout_success,
} from '../types';

export const Initail_State = {
  hideProgress: false,
  UserId: null,
};

export const loginReducer = (state = Initail_State, action: any) => {
  switch (action.type) {
    case Get_Login:
      return {...state, hideProgress: false};
    case Login_Success:
      return {...state, hideProgress: true, UserId: action.data};
    case Restore_email:
      return {...state, hideProgress: true, UserId: action.data};
    case Login_Failure:
      return {...state, hideProgress: true};
    case Logout_success:
      return {...state, hideProgress: true, UserId: null};
    default:
      return state;
  }
};
