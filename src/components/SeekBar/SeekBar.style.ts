/*SeekBar component style file*/
import {StyleSheet} from 'react-native';
import R from '_src/assets/R';
export default StyleSheet.create({
  timersContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container: {
    alignSelf: 'stretch',
    height: 28,
    flex: 1,
    marginHorizontal: 5,
  },
  track: {
    backgroundColor: R.colors.BORDER,
    height: 1,
    position: 'relative',
    top: 14,
    width: '100%',
  },
  fill: {
    backgroundColor: '#FFF',
    height: 1,
    width: '100%',
  },
  handle: {
    position: 'absolute',
    marginLeft: -7,
    height: 28,
    width: 28,
  },
  circle: {
    borderRadius: 12,
    position: 'relative',
    top: 8,
    left: 8,
    height: 12,
    width: 12,
  },
});
