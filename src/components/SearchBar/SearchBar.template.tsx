import React from 'react';
import {TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import R from '_src/assets/R';
import style from './SearchBar.style';

export type SearchBarTemplateProps = {
  onChange: (input: string) => any;
};

const Template: React.FC<SearchBarTemplateProps> = ({onChange}) => {
  return (
    <View style={style.searchBar}>
      <TextInput
        style={style.textInput}
        onChangeText={onChange}
        selectionColor={R.colors.TEXT}
      />
      <Icon tvParallaxProperties name="search" color={R.colors.TEXT} />
    </View>
  );
};

export default Template;
