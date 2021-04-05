import React, {Component, useState, useRef} from 'react';
import {SafeAreaView, Text, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Login, Logout} from '../../../Redux/Actions/login_action';
import {useNavigation, useRoute} from '@react-navigation/native';

export interface Props {
  email: string;
}

const LoginScreen: React.FC<Props> = props => {
  const [email, setEmail] = useState('');

  React.useEffect(() => {}, []);

  const _signIn = () => {
    props.Login('Test');
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity style={{marginVertical: 20}} onPress={_signIn}>
        <Text> Login here to see homepage </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

function mapStateToProps(state: any) {
  const {hideProgress} = state.loginReducer;
  return {hideProgress};
}

export default connect(mapStateToProps, {Login, Logout})(LoginScreen);
