/*CreatePlaylistModal component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  content: {
    backgroundColor: R.colors.BG_TRANSPARENT,
    flex: 1,
    alignItems: 'center',
  },
  title: {marginBottom: 20},
  cancelButton: {marginTop: 20},
  buttonsWrapper: {marginTop: 20, width: '90%'},
});
