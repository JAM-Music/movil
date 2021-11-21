/*TextWithIcon component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: R.colors.TEXT,
    marginRight: 10,
  },
  text: {textAlign: 'center', color: R.colors.TEXT},
  muted: {color: R.colors.BORDER},
});
