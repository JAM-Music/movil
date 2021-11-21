import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PanResponder} from 'react-native';
import Template from './SeekBar.template';
export type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeekStart?: () => any;
  onSeek?: (time: number) => any;
  seeking?: boolean;
};

const SeekBar: React.FC<SeekBarProps> = ({
  currentTime,
  duration,
  onSeek,
  onSeekStart,
  seeking,
}) => {
  const seekPanResponder = useRef(PanResponder.create({}));
  const seekerWidth = useRef(0);
  const seekerOffset = useRef(0);
  const scrubbing = useRef(false);
  const [seekerPosition, updateSeekerPosition] = useState(0);

  /**
   * Return the time that the video should be at
   * based on where the seeker handle is.
   *
   * @return {float} time in ms based on seekerPosition.
   */
  const calculateTimeFromPosition = useCallback(
    position => {
      const percent = position / seekerWidth.current;
      return duration * percent;
    },
    [duration],
  );

  const calculatePositionFromTime = useCallback(
    time => {
      if (!duration) return 0;
      const percent = time / duration;
      return seekerWidth.current * percent;
    },
    [duration],
  );

  /**
   * Constrain the location of the seeker to the
   * min/max value based on how big the
   * seeker is.
   *
   * @param {float} val position of seeker handle in px
   * @return {float} constrained position of seeker handle in px
   */
  const constrainToSeekerMinMax = useCallback((val = 0) => {
    if (val <= 0) {
      return 0;
    } else if (val >= seekerWidth.current) {
      return seekerWidth.current;
    }
    return val;
  }, []);

  /**
   * Set the position of the seekbar's components
   * (both fill and handle) according to the
   * position supplied.
   *
   * @param {float} position position in px of seeker handle}
   */
  const setSeekerPosition = useCallback(
    (position = 0) => updateSeekerPosition(constrainToSeekerMinMax(position)),
    [updateSeekerPosition, constrainToSeekerMinMax],
  );

  /**
   * Get our seekbar responder going
   * When we start the pan tell the machine that we're
   * seeking. This stops it from updating the seekbar
   * position in the onProgress listener.
   * When panning, update the seekbar position.
   * On release we update the time and seek to it in the video.
   * If you seek to the end of the video we fire the
   * onEnd callback
   */
  const initSeekPanResponder = useCallback(() => {
    seekPanResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        if (onSeekStart) onSeekStart();
        scrubbing.current = true;
        const position = evt.nativeEvent.locationX;
        seekerOffset.current = evt.nativeEvent.locationX;
        setSeekerPosition(position);
      },

      onPanResponderMove: (evt, gestureState) => {
        const position = seekerOffset.current + gestureState.dx;
        setSeekerPosition(position);
      },

      onPanResponderRelease: (evt, gestureState) => {
        scrubbing.current = false;
        const time = calculateTimeFromPosition(
          seekerOffset.current + gestureState.dx,
        );
        if (onSeek) onSeek(time);
        seekerOffset.current = seekerOffset.current + gestureState.dx;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateTimeFromPosition, onSeekStart, onSeek]);

  useEffect(() => {
    initSeekPanResponder();
  }, [initSeekPanResponder]);

  useEffect(() => {
    if (!scrubbing.current && !seeking) {
      setSeekerPosition(calculatePositionFromTime(currentTime));
    }
  }, [calculatePositionFromTime, currentTime, setSeekerPosition, seeking]);

  return (
    <Template
      currentTime={currentTime}
      duration={duration}
      seekPanResponder={seekPanResponder.current}
      seekerPosition={seekerPosition}
      setSeekerWidth={width => (seekerWidth.current = width)}
    />
  );
};

export default SeekBar;
