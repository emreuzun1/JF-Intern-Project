import React from 'react';
import { Image } from 'react-native';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

interface IFormCard {
    title: string,
    update_at: string,
    count: number | string,
}

const FormCard: React.FC<IFormCard> = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center' }}>
                <Image style={styles.icon} source={require('../img/form-icon,.jpg')} />
            </View>
            <View>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.updateText}>{props.count} Submissions. Last updated at : {props.update_at}</Text>
                </View>
                <View style={styles.line}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: width / 1.2,
        margin: 12,
        flexDirection: 'row',
    },
    icon: {
        width: 36,
        height: 36,
        marginRight: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ccc'
    },
    updateText: {
        fontSize: 12,
        color: '#ccc'
    },
    line: {
        width: width / 1.2,
        borderBottomWidth: 1,
        marginTop: 8,
        borderColor: '#ccc'
    }
});

export default FormCard;