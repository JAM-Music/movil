/*AlbumDetails component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  background: {height: 250, justifyContent: 'flex-end'},
  main: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: R.colors.BG_TRANSPARENT,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {color: R.colors.LINKS, fontSize: 15, paddingLeft: 10},
  playIcon: {position: 'absolute', top: 50, right: 20},
  songsWrapper: {padding: 20},
});
