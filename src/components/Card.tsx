import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface ICard {
    item: any,
}

const Card: React.FC<ICard> = props => {

    //const { first, last } = props.item.answers[4].answer;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Emre Uzun</Text>
            <View style={styles.line}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#434343',
        height: 100,
        width: width / 0.8,
        margin: 12,
        borderRadius: 8,
    },

    titleText: {
        marginVertical: 4,
        marginLeft: 12,
        color: 'white',
        fontSize: 16
    },

    line: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: '#ccc'
    }
});

export default Card;