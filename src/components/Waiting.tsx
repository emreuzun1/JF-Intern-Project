import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Waiting = () => {
    return (
        <View style={styles.indicator}>
            <ActivityIndicator size="large" color='#fa8900' />
        </View>
    )
};

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center'
    }
});

export default Waiting;