/*Album component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {aspectRatio: 1, width: 50, borderRadius: 5, marginRight: 10},
  content: {flex: 1, flexDirection: 'row'},
  separator: {marginHorizontal: 10, color: R.colors.SECONDARY},
  artist: {color: R.colors.BORDER},
});
