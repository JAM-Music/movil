/*PlaylistDetails component style file*/
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
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    // flexWrap: 'wrap',
  },
  editIcon: {color: R.colors.BORDER, marginLeft: 10},
  playIcon: {position: 'absolute', top: '50%', right: 20},
  songsWrapper: {padding: 20},
  emptyMsg: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: R.colors.BORDER,
  },
  searchMsg: {
    fontSize: 18,
    color: R.colors.TEXT,
    textAlign: 'center',
    marginBottom: 20,
  },
  noFoundMsg: {
    fontSize: 18,
    color: R.colors.BORDER,
    marginTop: 20,
    textAlign: 'center',
  },
  searchWrapper: {marginTop: 40},
});
