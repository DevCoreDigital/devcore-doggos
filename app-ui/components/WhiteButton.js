import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import buttonStyles from '../styles/buttons';

const WhiteButton = ({ func, text }) => {
  return (
    <TouchableOpacity
      style={buttonStyles.whiteBtn}
      onPress={async () => await func()}>
      <Text style={buttonStyles.whiteBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default WhiteButton;
