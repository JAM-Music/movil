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
    marginHorizontal: 12,
  },
  track: {
    backgroundColor: R.colors.BORDER,
    height: 4,
    position: 'relative',
    top: 13,
    width: '100%',
    borderRadius: 2,
  },
  fill: {
    backgroundColor: '#FFF',
    height: 4,
    width: '100%',
    borderRadius: 2,
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
    top: 6,
    left: 0,
    height: 18,
    width: 18,
  },
});
