import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loading =
  (Comp: any) =>
  ({isLoading, children, ...props}) => {
    if (isLoading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#fa8900" />
        </View>
      );
    } else {
      return <Comp {...props}>{children}</Comp>;
    }
  };

const styles = StyleSheet.create({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
