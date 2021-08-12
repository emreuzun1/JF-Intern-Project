import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {styles} from '../Pages/Form/style';

interface IFormCard {
  title: string;
  update_at: string;
  count: number | string;
  onPress: () => void;
}

const FormCard: React.FC<IFormCard> = props => {
  return (
    <TouchableOpacity style={styles.formContainer} onPress={props.onPress}>
      <View style={{justifyContent: 'center'}}>
        <Image style={styles.icon} source={require('../img/form-icon,.jpg')} />
      </View>
      <View>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.updateText}>
            {props.count} Submissions. Last updated at : {props.update_at}
          </Text>
        </View>
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};

export default FormCard;
