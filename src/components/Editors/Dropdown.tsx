import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import SelectDropDown from 'react-native-select-dropdown';
import {Colors} from '../../constants/Colors';

export function Dropdown({question}: ISubmissionEdit) {
  const data = question.options.split('|');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{question.text}</Text>
      <SelectDropDown
        data={data}
        onSelect={selectedItem => {
          console.log(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        buttonStyle={styles.button}
        rowStyle={styles.row}
        renderCustomizedRowChild={item => (
          <Text style={styles.text}>{item}</Text>
        )}
        renderCustomizedButtonChild={item => (
          <Text style={styles.text}>{item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    marginLeft: 32,
  },

  header: {
    fontFamily: 'sf-pro-heavy',
    color: Colors.grey,
    fontSize: 20,
  },

  row: {
    backgroundColor: Colors.jotformGrey,
  },
  text: {
    color: Colors.lightGrey,
    fontFamily: 'sf-regular',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    marginTop: 8,
  },
});
