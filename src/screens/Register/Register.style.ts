/*Login component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  content: {
    // flex: 1,
    // height: '100%',
    flexGrow: 1,
  },
  main: {
    flex: 1,
    paddingTop: '10%',
  },
  title: {
    color: R.colors.SECONDARY,
  },
  form: {
    marginTop: 50,
  },
  registerLine: {
    flexDirection: 'row',
  },
  registerQuestion: {
    marginRight: 10,
  },
  register: {
    color: R.colors.LINKS,
  },
});
