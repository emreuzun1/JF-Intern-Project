  import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  data: any;
  style: any;
}

const Email: FC<Props> = props => {
  var type_name = 'control_dropdown';
  const [dropdown, setDropdown] = useState<string>('');

  const getName = () => {
    Object.keys(props.data).map(key => {
      if (props.data[key].type === type_name) {
        setDropdown(props.data[key].prettyFormat || props.data[key].answer);
      }
    });
  };

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <View>
      <Text style={props.style}>{dropdown}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Email;
