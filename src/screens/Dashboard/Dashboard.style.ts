/*Dashboard component style file*/
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  thumbnail: {
    width: '21%',
    marginHorizontal: '2%',
    marginBottom: 20,
  },
  topBar: {flexDirection: 'row', justifyContent: 'space-between'},
  person: {flexDirection: 'row', alignItems: 'center'},
  recientes: {marginTop: 20},
  fullName: {fontSize: 17},
  playlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  playlist: {marginTop: 30, marginBottom: 15},
});
