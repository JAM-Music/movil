/*ImagePicker component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  button: {
    aspectRatio: 1,
    width: '100%',
    backgroundColor: R.colors.BG,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: R.colors.BORDER, fontSize: 20},
  image: {aspectRatio: 1, width: '100%', borderRadius: 15},
});
