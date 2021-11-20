/*TrackRow component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  content: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: R.colors.BORDER,
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {aspectRatio: 1, width: 45, borderRadius: 5, marginRight: 10},
  textWrappers: {flex: 1, justifyContent: 'center'},
});
