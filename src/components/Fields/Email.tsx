import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  data: any;
  style: any;
}

const Email: FC<Props> = props => {
  var type_name = 'control_email';
  const [email, setEmail] = useState<string>('');

  const getName = () => {
    Object.keys(props.data).map(key => {
      if (props.data[key].type === type_name) {
        setEmail(props.data[key].prettyFormat || props.data[key].answer);
      }
    });
  };

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <View>
      <Text style={props.style}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Email;
