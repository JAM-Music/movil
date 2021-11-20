/*Header component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.BG,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  main: {flexDirection: 'row'},
  iconWrapper: {width: '33%', alignItems: 'flex-start'},
});
