// this file contains UI of loader/Progress bar

import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const ProgressBar = (props: any) => {
  const {hide} = props;
  if (hide) {
    return null;
  } else {
    return (
      <View style={[styles.loading]}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

ProgressBar.propTypes = {
  hide: PropTypes.bool,
};

export default ProgressBar;
