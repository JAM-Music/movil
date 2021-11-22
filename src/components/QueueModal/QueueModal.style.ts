/*QueueModal component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  content: {
    backgroundColor: R.colors.BG_TRANSPARENT,
    flex: 1,
    alignItems: 'center',
  },
  title: {textAlign: 'center', margin: 20},
  closeButton: {marginTop: 20},
});
