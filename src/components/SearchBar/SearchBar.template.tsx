import React from 'react';
import {TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import R from '_src/assets/R';
import style from './SearchBar.style';

export type SearchBarTemplateProps = {};

const Template: React.FC<SearchBarTemplateProps> = () => {
  return (
    <View style={style.searchBar}>
      <TextInput style={style.textInput} selectionColor={R.colors.TEXT} />
      <Icon tvParallaxProperties name="search" color={R.colors.BG} />
    </View>
  );
};

export default Template;
