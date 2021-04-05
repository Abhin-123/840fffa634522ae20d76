import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
const Loader = () => {
    return (
        <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000FF" />
        </View>
    )
}
export default Loader;