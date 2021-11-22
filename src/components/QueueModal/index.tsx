import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Template from './QueueModal.template';
export type QueueModalProps = {
  onClose?: () => any;
  visible?: boolean;
};

const QueueModal: React.FC<QueueModalProps> = props => {
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [nextTrack, setNextTrack] = useState(0);
  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.nextTrack !== undefined) {
      setNextTrack(event.nextTrack);
    }
  });

  useEffect(() => {
    TrackPlayer.getQueue().then(setTracks);
    TrackPlayer.getCurrentTrack().then(setNextTrack);
  }, []);

  const nextSongs = useMemo(
    () => tracks.slice(nextTrack + 1),
    [nextTrack, tracks],
  );

  const remove = useCallback(
    index => {
      const realIndex = tracks.length - nextSongs.length + index;
      const copy = [...tracks];
      copy.splice(realIndex, 1);
      setTracks(copy);
      TrackPlayer.remove(realIndex);
    },
    [tracks, nextSongs],
  );

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={props.onClose}
      visible={props.visible}>
      <Template tracks={nextSongs} onRemove={remove} onClose={props.onClose} />
    </Modal>
  );
};

export default QueueModal;
