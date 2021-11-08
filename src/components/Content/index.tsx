import React from 'react';
import {ViewStyle} from 'react-native';
import styles from './Content.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export type ContentProps = {style?: ViewStyle};

const Content: React.FC<ContentProps> = ({children, style}) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[styles.content, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Content;
