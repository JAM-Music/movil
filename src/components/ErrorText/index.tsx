import React from 'react';
import {Text, TextStyle} from 'react-native';
import styles from './Errortext.style';

export type ErrorTextProps = {
  error: string;
  style?: TextStyle;
};

const ErrorText: React.FC<ErrorTextProps> = ({error, style}) => {
  return <Text style={[styles.text, style]}>{error}</Text>;
};

export default ErrorText;
