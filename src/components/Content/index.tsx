import React from 'react';
import {ViewStyle} from 'react-native';
import styles from './Content.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export type ContentProps = {style?: ViewStyle; fluid?: boolean};

const Content: React.FC<ContentProps> = ({children, style, fluid}) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[fluid ? styles.fluid : styles.content, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Content;
