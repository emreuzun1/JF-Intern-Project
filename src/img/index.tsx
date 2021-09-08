import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/Colors';

export function getImage(type: string) {
  switch (type) {
    case 'control_fullname':
      return <Ionicons name="text" size={20} color={Colors.grey} />;
    case 'control_phone':
      return <Ionicons name="call" size={20} color={Colors.grey} />;
    case 'control_email':
      return <Ionicons name="mail" size={20} color={Colors.grey} />;
    case 'control_radio':
      return <Ionicons name="radio-button-on" size={20} color={Colors.grey} />;
    case 'control_dropdown':
      return (
        <MaterialCommunityIcons
          name="form-dropdown"
          size={20}
          color={Colors.grey}
        />
      );
    case 'control_textbox':
      return (
        <MaterialCommunityIcons
          name="format-text"
          size={20}
          color={Colors.grey}
        />
      );
    case 'control_textarea':
      return (
        <MaterialCommunityIcons name="text" size={20} color={Colors.grey} />
      );
  }
}
