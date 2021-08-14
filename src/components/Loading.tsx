import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

interface Props {
  isLoading: boolean;
  children: any;
  props?: any;
}

const withLoading = (Comp: any) => {
  const WithLoading: React.FC<Props> = ({isLoading, children, ...props}) => {
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
  return WithLoading;
};

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withLoading;
