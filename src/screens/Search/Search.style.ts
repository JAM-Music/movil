/*Search component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  noFoundMsg: {
    fontSize: 18,
    color: R.colors.BORDER,
    marginTop: 20,
    textAlign: 'center',
  },
  searchMsg: {
    fontSize: 18,
    textAlign: 'center',
  },
  searchMsgWrapper: {marginTop: 20},
});
