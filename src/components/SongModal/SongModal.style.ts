/*SongModal component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  content: {
    backgroundColor: R.colors.BG_TRANSPARENT,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '60%',
    borderRadius: 10,
  },
  title: {marginTop: 10},
  autor: {marginTop: 5, color: R.colors.BORDER},
  main: {marginTop: 20, width: '60%', marginBottom: 30},
});
