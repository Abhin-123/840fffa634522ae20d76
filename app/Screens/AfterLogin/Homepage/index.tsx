import React, { Component, useState, useRef } from 'react';
import { SafeAreaView, Text, Alert, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Login, Logout } from '../../../Redux/Actions/login_action'
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeScreen = (props:any) => {

  const navigation = useNavigation();
  const pass = useRef()
  const [email, setEmail]= useState("");

  React.useEffect( ()=>{
    
  },[])

  return  (
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{props.Logout()}}>
        <Text> Logout </Text>
      </TouchableOpacity>        
    </View>                   
  )
    
}

function mapStateToProps(state:any) {
    const { hideProgress } = state.loginReducer;
    return { hideProgress}
}

export default connect(mapStateToProps, {Logout})(HomeScreen)