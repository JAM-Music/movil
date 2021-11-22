import {useCallback} from 'react';

import {getPlaySong} from '_src/services/songs';
import {Song} from '_src/utils/types/Songs';
import {getSession} from '_services/RESTMethods';
import TrackPlayer, {Track} from 'react-native-track-player';

import {backendURL} from '_src/config/backend';

export function useSongs() {
  const getSong = useCallback(async (id: string) => {
    if (!id) return;
    const musicTemp = await getPlaySong(id);
    return musicTemp;
  }, []);

  const assingSongs = useCallback(async (list: Array<Song>) => {
    if (!list) return;
    const sessionId = await getSession();
    const Authorization = `Bearer ${sessionId}`;
    TrackPlayer.reset();
    const TrackList = list?.map(listSongs => {
      return {
        url: `${backendURL}/songs/play/${listSongs._id}`, // Load media from the network
        title: listSongs.title,
        artist: listSongs.album.author.name,
        album: listSongs.album.title,
        genre: listSongs.genre.name,
        duration: listSongs.duration, // Duration in seconds
        artwork: listSongs.album.image,
        headers: {
          Authorization,
        },
      } as Track;
    });
    await TrackPlayer.add(TrackList);
    TrackPlayer.play();
  }, []);

  const addSong = useCallback(async (song: Song) => {
    const sessionId = await getSession();
    const Authorization = `Bearer ${sessionId}`;
    const track = {
      url: `${backendURL}/songs/play/${song._id}`, // Load media from the network
      title: song.title,
      artist: song.album.author.name,
      album: song.album.title,
      genre: song.genre.name,
      duration: song.duration, // Duration in seconds
      artwork: song.album.image,
      headers: {
        Authorization,
      },
    } as Track;
    await TrackPlayer.add([track]);
    TrackPlayer.play();
  }, []);

  return {getSong, assingSongs, addSong};
}
