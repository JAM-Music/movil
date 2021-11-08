/*SearchBar component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: R.colors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textInput: {flex: 1, paddingVertical: 5, color: R.colors.TEXT},
});
