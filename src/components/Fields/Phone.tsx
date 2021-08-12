import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';

interface Props {
  data: any;
  style: any;
}

const Phone: FC<Props> = props => {
  var type_name = 'control_phone';
  const [phone, setPhone] = useState<string>('');

  const getName = () => {
    Object.keys(props.data).map(key => {
      if (props.data[key].type === type_name) {
        setPhone(props.data[key].prettyFormat || props.data[key].answer);
      }
    });
  };

  React.useEffect(() => {
    getName();
  });

  return (
    <View>
      <Text style={props.style}>{phone}</Text>
    </View>
  );
};

export default Phone;
