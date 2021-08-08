import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('screen');

interface ICard {
    item: any,
}

const Card: React.FC<ICard> = props => {

    const answers = props.item;

    const printText = (item: any) => {
        return (
            <View style={styles.textContainer}>
                
                <Text style={styles.titleText}>{item.item.prettyFormat || item.item.answer}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.id}
                horizontal
                data={answers}
                renderItem={printText.bind(this)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282828',
        height: 100,
        width: width / 0.4,
        marginTop: 12,
        marginLeft: 12,
        borderRadius: 8,
    },

    textContainer: {
        width: width / 1.2,
        borderRightWidth: 1,
    },

    titleText: {
        marginVertical: 4,
        marginLeft: 12,
        color: 'white',
        fontSize: 16,
    },
});

export default Card;