import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, LogBox } from 'react-native';

const { width } = Dimensions.get('screen');

interface ICard {
    item: any,
}

const Card: React.FC<ICard> = props => {
    const answers = props.item;

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const printText = (item: any) => {
        if (item.index !== 0)
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.answerText} numberOfLines = {1}>{item.item.prettyFormat || item.item.answer}</Text>
                </View>
            )
        else
            return (
                <View></View>
            )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>{props.item[0].prettyFormat || props.item[0].answer}</Text>
                <View style={styles.line}></View>
            </View>
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
        height: 75,
        marginTop: 12,
        marginLeft: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    textContainer: {
        width: width / 3,
        borderRightWidth: 0.5,
        borderColor : '#ccc',
        justifyContent : 'center',
    },
    answerText: {
        marginVertical: 4,
        marginLeft: 12,
        color: 'white',
        fontSize: 14,
        fontFamily : 'sf-display-thin',
    },

    headerText: {
        fontSize: 14,
        color: '#ccc',
        margin: 8,
        fontFamily : 'sf-display-thin'
    },
    line: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    }
});

export default Card;