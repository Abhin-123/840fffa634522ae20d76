import React, {Component} from 'react';
import {SafeAreaView, Text, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {Login, Logout} from '../../../Redux/Actions/login_action';

const SignUpScreen = (props: any) => {
  // Email/Password Signin
  const _signIn = () => {
    props.Login('Test');
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={_signIn} style={{marginVertical: 20}}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  const {hideProgress} = state.loginReducer;
  return {hideProgress};
};

export default connect(mapStateToProps, {Login, Logout})(SignUpScreen);
