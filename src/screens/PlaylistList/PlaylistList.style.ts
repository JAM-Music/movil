/*PlaylistList component style file*/
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playlists: {flexDirection: 'row', flexWrap: 'wrap'},
  thumbnail: {width: '25%', marginHorizontal: '4%', marginBottom: 20},
});
