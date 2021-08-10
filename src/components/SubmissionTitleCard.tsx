import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

interface Props {
  item: any;
}

const SubmissionText: React.FC<Props> = props => {
  if (props.item.index !== 0)
    return (
      <View style={styles.headers}>
        <Image
          source={props.item.item.icon}
          style={{width: 16, height: 16, tintColor: '#ccc'}}
        />
        <Text style={styles.titleText} numberOfLines={1}>
          {props.item.item.text}
        </Text>
      </View>
    );
  else return <View></View>;
};

const styles = StyleSheet.create({
  headers: {
    height: height / 20,
    width: width / 3,
    flexDirection: 'row',
    borderRightWidth: 0.15,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 8,
  },
  titleText: {
    fontSize: 12,
    marginHorizontal: 12,
    color: '#9c9c9c',
    fontFamily: 'sf-display-thin',
  },
});

export default SubmissionText;
