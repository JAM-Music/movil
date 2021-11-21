/*PlayerOverlay component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 20,
    width: '100%',
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.colors.PRIMARY_TRANSPARENT,
    width: '100%',
    height: 55,
    padding: 5,
    borderRadius: 10,
  },
  image: {aspectRatio: 1, width: 50, borderRadius: 10, marginRight: 20},
  author: {fontSize: 12},
  playWrapper: {flex: 1, alignItems: 'flex-end', paddingRight: 10},
  index: {flex: 1},
});
