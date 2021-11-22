/*Profile component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  background: {height: 250, justifyContent: 'flex-end'},
  name: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: R.colors.BG_TRANSPARENT,
  },
  buttonWrapper: {padding: 20},
  playIcon: {},
  controls: {
    alignItems: 'center',
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  seekBar: {marginTop: 20},
  title: {marginTop: 20, fontSize: 20},
  album: {marginTop: 10, fontSize: 15},
  image: {width: '80%', aspectRatio: 1, borderRadius: 10},
  main: {flex: 1, alignItems: 'center'},
  queueWrapper: {alignItems: 'flex-end', width: '100%', marginTop: 20},
});
